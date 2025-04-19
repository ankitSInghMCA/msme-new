var tempformstepcounter = 0;



function handleAjaxFormSubmit(e){
	e.preventDefault();

	var form = $(this);

	tempformstepcounter++;

	window['current_form'] = form;
	$('.text-danger').remove(); 
	var params = form.serializeArray();

	
	var form_id = form.attr('data-form-id');
	var submitUrl = eventUrl+'/formAjax/'+(moduletype?moduletype:'event')+'/'+eventId+'/'+form_id;

	if(form.hasClass('sponsor-form')){
		submitUrl = form.attr("action");
	}
	

	form.find(".validationError").remove();
	form.find(`.hasError`).removeClass("hasError");

	$.ajax({
		url:submitUrl,
		type: "POST",
		data:new FormData(this),
		processData:false,
		contentType:false,
		success: function(res) {
			console.log(res);
			if(res.type == 'payment_url'){
				var url = res.payment_page_url;
				if(url !=null){
					window.location = url;
				}
			}

			
			if(res.type == 'primary'){
				var response = res.response;
				if(response !=null){
					var form_step = +res.response.form_number + 1;
					var id = res.response.id;
					form.find(`[name=submission_id]`).val(id);
					formStep(form,response.msg,response.class); 

					

					
				}
			}

			if(res.type == 'error'){
				var errors = res.response;
				tempformstepcounter--;
				$.each(errors, function(index, item) {
					var strToarray =index.split('.');

					var newkey="";
					$.each(strToarray, function(key,val) {
						if(key !=0){
							newkey +=`\\[${val}\\]`;
						}else{
							newkey +=`${val}`;
						} 
					});
					
					form.find(`#${newkey}`).addClass("hasError");
					form.find(`#${newkey}`).parent().append(`<span class="validationError text-danger">${item}</span>`);
				});

			}

		},
		error: function() {

		}
	});


}

function formSuccessfullySubmitted(form_id){
	try{
		eval('executeFormCallbackFor'+form_id+'()');
	}
	catch(e){
		//executeFormCallback();
	}
}

function formatAjaxForm(form){
	var count = form.find(`[id*=submission\\[step-]`).length;
	var $step = count+1;
	form.attr('data-steps',$step);
	form.attr('data-current-step',0);
	form.find('.form-group:not([data-step])').attr("data-step",$step);
	//form.find(`[id*=submission\\[]`).parent().attr('data-step',$step);
	form.find(`[id*=submission\\[step-]`).reverse().each(function(){
		$step--;
		$(this).parent().prevAll().attr('data-step',$step);
		$(this).parent().remove();
	});
	
}

function formStep(form,msg,clas){
	var form_id = form.attr('data-form-id');
	step = parseInt(form.attr('data-current-step')) + 1;
	form.find('.form-group').removeClass('hide');
	form.find('.form-group:not([data-step='+step+'])').addClass('hide').find('.form-control').removeAttr('required');
	console.log('xxxx',step,form.attr('data-steps'));
	if(step == (parseInt(form.attr('data-steps'))+1)){
		//showToastMessage(msg,clas);
		//form.trigger("reset");
		form.hide();
		form.parent().append('<div class="all-center form-status-'+clas+'" style="min-height:300px;"><div style="display:inline-block" class="form-response"><h5>'+msg+'</h5></div></div>');
		formSuccessfullySubmitted(form_id);
		
	}
	form.attr('data-current-step',step);
	

}


function convertFormToAjax($form){
	formatAjaxForm($form);
	formStep($form,1); 
	$form.on('submit',handleAjaxFormSubmit);
}


$(function(){
	convertFormToAjax($("form.ajax-form")); 
});



