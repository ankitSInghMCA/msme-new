



function emailFormAppend(){
    
    var img = `<img id="gif" style="width:15px;" src="${gif}"/>`;
    var form =`
    <form action="javascript:">
    <div class="form-group two-column">
    <label for="email" class="control-label required">Email</label>
    <input class="form-control" autocomplete="off" required="required" name="email" type="email" id="email">
    </div>
    <button class="form-control-v2" onclick="attendEvent()" type="submit">Proceed &nbsp; ${img}</button>  
    </form>
    `;
    $('.form-append .backendform').hide();
    $('.form-append .step1').append(form).show();
    $("#gif").hide();
}

function otpFormAppend(email){
    var otpForm =`
    <form action="javascript:">
    <div class="form-group two-column">
    <label for="email" class="control-label required">Email</label>
    <input class="form-control" required="required" name="email" type="text" value="${email}" id="email">
    <span class="text-danger otpInvalid" style="top:37px;"></span>
    </div>
    <div class="form-group two-column forotp">
    <label for="otp" class="control-label required">OTP</label>
    <input class="form-control" placeholder="Enter OTP" required="required" name="otp" type="text" id="otp">
    <span class="text-danger otpInvalid" style="top:37px;"></span>
    </div>
 
    <button class="form-control-v2" id="otpValidate" onclick="validateOtp()" type="submit">Submit</button>  
    </form>
    `;
   $('.form-append .backendform').hide();
    $('.form-append .step2').append(otpForm).show();
}

emailFormAppend();


loadScript(JS_PATH+'/device_storage.js?mod=' + file_version,function(){
    var getEmail = getCookie('email');
    if(getEmail != null){
        $("#email").val(getEmail);
    }    
})


function attendEventWithEmail(email){

    var token = "{{csrf_token()}}"
    var formId = form_id;
    $.ajax({
        url:eventUrl+`/event/${eventId}/attendEventWithEmail`,
        type: "POST",
        data:{email:email,event_id:eventId,form_id:formId},
        beforeSend: function() {
           $("#gif").show();
         },
        success: function(res) {  
          console.log(res);
          if(res.status == 1 && res.data != null){              
            $('.form-append .backendform').hide();
            $('.form-append .success-text').show(); 
            $('.form-append .update-profile').show();
          //  $('.form-append .step3').show();
            var data = res.data;
            setCookie(data.email);
           
              //  var join_link = `<a href='${data.join_link}'>Click here to join session</a>`;
              //   if(data.join_url !=null){
              //    $(".link_url").append(join_link);
              //   }
              
             $.each(data, function (i,j) {
                $('input[name=submission\\['+i+'\\]]').val(j);                 
              });

          }else{
            if(res.status == 1){
              sendOtp(email);
            }
          }
        },
        error: function() {

        }
    });
}

function attendEvent(){
  var email = $('#email').val();
  var cookieEmail = getCookie('email');

  attendEventWithEmail(email);
 }


function sendOtp(email){

    $.ajax({
        url: eventUrl+'/api/requestotp/email',
        type: "POST",
        data:{destination:email},
        success: function(res) {
            
            if(!Array.isArray(res)){
            var data = JSON.parse(res);
             if(data.length >0){
               if(data[2].success == 1){
                $('.step2').html('');  
                otpFormAppend(email);
               }
             }
            }

        },
        error: function() {

        }
    });
}

function validateOtp(){

    var otp = $("#otp").val();
    var email = $("#email").val();
    var event_id = eventId;
    var formId = form_id;

    $.ajax({
        url: eventUrl+`/event/${eventId}/validateOtp`,
        type: "POST",
        data:{otp:otp,email:email,event_id:event_id,form_id:formId},
        success: function(res) {
         // console.log(res);
          if(res.status == 1){
             var mail = res.data.email;
             setCookie(res.data.email);
            var data =res.data.submission;
            $('.form-append .backendform').hide();
            $('.form-append .backendform .text-success').hide();
            $('.form-append .otp-success').show(); 
            $('.form-append .success-text').hide(); 
            $('.form-append .update-profile').hide(); 
             $('.form-append .step3').show(); 
          //  $('.form-append .update-profile').show(); 
         
            $.each(data, function (i,j) {
                
                 $('input[name=submission\\['+i+'\\]]').val(j);
              });

            // $("input[name='email']").val(data.email);
            // $("input[name='mobile']").val(data.mobile);
            // $("input[name='name']").val(data.name);
            // $("input[name='company']").val(data.company);
            // $("input[name='designation']").val(data.designation);
          }else{
           
             $('.otpInvalid').text(res.msg);
              $("#otp").val('');
              $("#otpValidate").remove();
              $(".forotp").remove();
              var resendButton = `<button class="form-control" id="otpResend" onclick="resendOtp('${email}')" type="submit">Resend Otp</button>`;
              $(".step2 form").append(resendButton);
          }
        },
        error: function() {

        }
    });


}



function resendOtp(email){
  sendOtp(email);
}

//
$(document).ready(function(){  

$(".update-profile").click(function(){
$('.form-append .success-text').hide(); 
$('.form-append .update-profile').hide(); 
     $('.form-append .step3').show(); 
});

$("#backendForm").submit(function(e) {
    e.preventDefault();
    var formData = []
    var params   = $('#backendFormSubmit').serializeArray();
    var obj = {};
    $.each(params, function(i, val) {
       obj[val.name] = val.value;
    });
   var formId = form_id;
   obj['form_id'] = formId;

    $.ajax({
        url:eventUrl+'/attendeeDetails',
        type: "POST",
        data:obj,
        success: function(res) {
        // console.log(res);
         if(res.status ==1){
          // if(res.data){
          //   var join_link = `<a href='${data}'>Click here to join session</a>`;
          //     console.log(join_link);
          //   $(".link_url").append(join_link);
          //  }
            $('.form-append .step3').hide(); 
            $('.form-append .otp-success').hide();
            $('.form-append .success-text-profile').show(); 
         }
        },
        error: function() {

        }
    });


   });

});