var $_GET = {};
if (typeof $base_path == 'undefined') {
	var $base_path = window.location.protocol + '//' + window.location.host;
}
var $app = {};

env = (typeof env != 'undefined') ? env : 'live';

function in_array(needle, haystack) {
	var found = 0;
	for (var i = 0, len = haystack.length; i < len; i++) {
		if (haystack[i] == needle) return i;
		found++;
	}
	return -1;
}
//if(in_array( window.location.host, ['www.financialexpress.com','financialexpress.com','www.indianexpress.com','indianexpress.com'] ) > -1){
if (in_array(window.location.host, ['www.financialexpress.com', 'financialexpress.com']) > -1) {
	$base_path = window.location.protocol + '//' + window.location.host + '/events'
}

(function () { //all event listeners

})();



JS_PATH = $base_path + '/jma/js';
if(typeof $asset_domain != 'undefined'){
	JS_PATH = $asset_domain + '/jma/js';
}

file_version = 1;

(function () {
	let match,
		pl = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) {
			return decodeURIComponent(s.replace(pl, " "));
		},
		query = window.location.search.substring(1);

	while (match = search.exec(query)) {
		if (decode(match[1]) in $_GET) {
			if (!Array.isArray($_GET[decode(match[1])])) {
				$_GET[decode(match[1])] = [$_GET[decode(match[1])]];
			}
			$_GET[decode(match[1])].push(decode(match[2]));
		} else {
			$_GET[decode(match[1])] = decode(match[2]);
		}
	}
})();


(function (d, s, id) {
	IESSO = window.IESSO || (window.IESSO = []);
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.defer = "defer";
	js.src = "https://accounts.indianexpress.com/swagger-js/v2.0.0/sdk.js?v=202109010843";
	fjs.parentNode.insertBefore(js, fjs);
}(document, "script", "ie-jssdk"));
IESSO.push({
	client_id: "branwagon-test",
	client_id: "financialexpress-03",
	redirect_uri: $base_path + "/ie-oauth/redirect",
	request_uri: location.href,
});

function parseBool(str) {

	if (str.length == null) {
		return str == 1 ? true : false;
	} else {
		return str == "true" ? true : false;
	}

}


function getMediaType() {
	var mediaWidth = window.innerWidth;
  if (typeof mediaWidth !== 'number') {
    return "Invalid input: mediaWidth must be a number.";
  }

  if (mediaWidth < 600) {
    return "mobile";
  } else if (mediaWidth >= 600 && mediaWidth < 992) {
    return "tablet";
  } else {
    return "desktop";
  }
}

function isMobile() {
	if (true || env == 'live') {
		var is_mobile = localStorage.getItem('is_mobile');
		if (!(is_mobile === null)) {
			return parseBool(is_mobile);
		}
	}
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	localStorage.setItem('is_mobile', check);
	return check;
};

var deviceType = isMobile() ? 'mobile' : 'desktop';
var mediaType = getMediaType();


function isExternalUrl(url) {
	return !(location.href.replace("http://", "").replace("https://", "").split("/")[0] === url.replace("http://", "").replace("https://", "").split("/")[0]);
}

function getYoutubeParts(url) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*)([^"&?\/\s]{11})(.*)/;
	const match = url.match(regExp);
	console.log(match);

	return (match && match[3].length === 11)
		? [match[3], match[4]]
		: [];
}


function resizeDiv() {
	vpw = $(window).width();
	vph = $(window).height();
	if ($(".main-header").css('position') != 'fixed') {
		vph = vph - parseInt($(".main-header").css('height'));
	}
	//vph = (vph > vpw)?vpw:vph;
	$('.fill-viewport').css({ 'height': vph + 'px', 'position': 'relative' });
}

executeFunction = function (func, params) {
	func = (typeof func == 'string' && typeof window[func] != 'undefined') ? window[func] : func;
	if (typeof func == 'string') {
		try {
			func = eval(func);
		}
		catch (e) { }
	}
	if (typeof func != 'function')
		return;
	func.apply(null, Array.prototype.slice.call(params instanceof Array ? params : []));
}

function loadScript(src, callback, async, params) {
	if (typeof async == 'undefined')
		async = true;
	else
		async = (async) ? true : false;
	var s,
		r,
		t;
	r = false;
	var src_alphanumeric = src.replace(/[^a-zA-Z0-9]+/g, '-');
	src_alphanumeric = src_alphanumeric.toLowerCase();
	if (!(document.getElementById(src_alphanumeric))) {
		s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = src;
		s.id = src_alphanumeric;
		if (async == true) {
			s.async = true;
			s.defer = true;
		}
		else
			s.async = false;
		s.onload = s.onreadystatechange = function () {
			if (!r && (!this.readyState || this.readyState == 'complete')) {
				r = true;
				if (typeof callback == 'function')
					callback(params);
				document.getElementById(s.id).setAttribute('data-ready', 1);
			}
		};
		t = document.getElementsByTagName('head')[0];
		t.appendChild(s, t);
	}
	else if (document.getElementById(src_alphanumeric)) {
		if (document.getElementById(src_alphanumeric).getAttribute('data-ready') == 0 || document.getElementById(src_alphanumeric).getAttribute('data-ready') == null) {
			setTimeout(function () { loadScript(src, callback, async, params); }, 100);
		} else {
			if (typeof callback == 'function') {
				//callback.apply(null, Array.prototype.slice.call(params instanceof Array?params:[]));
				callback(params);
			}

		}

	}
}
function loadCss(src) {
	var src_alphanumeric = src.replace(/[^a-zA-Z0-9]+/g, '-');
	src_alphanumeric = src_alphanumeric.toLowerCase();
	if (!(document.getElementById(src_alphanumeric))) {
		var link = document.createElement("link");
		link.href = src;
		link.type = "text/css";
		link.rel = "stylesheet";

		document.getElementsByTagName("head")[0].appendChild(link);
	}
}

function addDynamicCss(css) {
	head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	head.appendChild(style);
}

function createPopupWin(pageURL, pageTitle,
	popupWinWidth, popupWinHeight) {
	popupWinWidth = ((screen.width - popupWinWidth) < 0) ? (screen.width - 20) : popupWinWidth;
	popupWinHeight = ((screen.height - popupWinHeight) < 0) ? (screen.height - 20) : popupWinHeight;
	var left = (screen.width - popupWinWidth) / 2;
	var top = (screen.height - popupWinHeight) / 2;
	var myWindow = window.open(pageURL, pageTitle,
		'resizable=yes, width=' + popupWinWidth
		+ ', height=' + popupWinHeight + ', top='
		+ top + ', left=' + left);
}

function doubleScroll(element) {
	var scrollbar = document.createElement('div');
	scrollbar.appendChild(document.createElement('div'));
	scrollbar.style.overflow = 'auto';
	scrollbar.style.overflowY = 'hidden';
	scrollbar.firstChild.style.width = element.scrollWidth + 'px';
	scrollbar.firstChild.style.paddingTop = '1px';
	scrollbar.firstChild.appendChild(document.createTextNode('\xA0'));
	var running = false;
	scrollbar.onscroll = function () {
		if (running) {
			running = false;
			return;
		}
		running = true;
		element.scrollLeft = scrollbar.scrollLeft;
	};
	element.onscroll = function () {
		if (running) {
			running = false;
			return;
		}
		running = true;
		scrollbar.scrollLeft = element.scrollLeft;
	};
	element.parentNode.insertBefore(scrollbar, element);
}

function addSocialShareWdgt(dispType) {
	if (dispType == 0) return;
	var socialhtml = '<div class="social-share-wdgt dt-' + dispType + '"><a class="socialshare fb hide" type="fb"><i class="fa fa-facebook"></i></a> <a class="socialshare twtr hide" type="tw"><i class="fa fa-twitter"></i></a> <a class="socialshare lin hide" type="ln" ><i class="fa fa-linkedin"></i></a> <!--<a class="socialshare gplus hide" type="gg" ><i class="fa fa-google-plus"></i></a>--> <a class="socialshare wa hide" type="wa" ><i class="fa fa-whatsapp"></i></a><a class="socialshare sharebtn" alt="Share this page" title="Share this page"><i class="fa fa-share"></i></a> </div>';
	$(" .main-content").append(socialhtml);
	$(".social-share-placeholder").append(socialhtml);

	//$curl = base_url + '/' +pageTypeUrl + pageName;
	$curl = window.location.href.split('?')[0];
	$ctitle = encodeURI($('title').html());
	$cvia = '';
	$chashtags = "";
	$sharepath = {};
	$sharepath['fb'] = 'https://www.facebook.com/sharer.php?u=' + $curl;
	$sharepath['tw'] = 'https://twitter.com/intent/tweet?url=' + $curl + '&text=' + $ctitle + ($cvia ? ('&via=' + $cvia) : '') + '&hashtags=' + $chashtags;
	$sharepath['ln'] = 'https://www.linkedin.com/shareArticle?share=linkedin&title=' + $ctitle + '&url=' + $curl + '%3Fq%3D' + Date.now();
	$sharepath['gg'] = 'https://plus.google.com/share?url=' + $curl;
	$sharepath['wa'] = ((false && deviceType != 'mobile') ? 'https://wa.me/' : 'https://api.whatsapp.com/send') + '?text=' + $curl;
	//console.log($cvia);
	$(".socialshare").each(function () {
		$(this).attr('href', $sharepath[$(this).attr('type')]);
	});

	$('.socialshare.sharebtn').on("click", function (e) {
		$('.socialshare:not(.sharebtn)').toggleClass('hide');
	});

	$('.socialshare:not(.sharebtn)').on("click", function (e) {
		$(this).customPopup(e);
	});
}

function getNode($data, $key, $default) {
	$default = $default ? $default : '';
	if (typeof $data != 'undefined' && typeof $key != 'undefined' && $data && $key) {
		if (typeof $data[$key] != 'undefined') {
			return $data[$key];
		}
		else {
			return $default;
		}
	}
	return $default;
}

function addParameterToURL(url, param) {
	_url = url;
	_url += (_url.split('?')[1] ? '&' : '?') + param;
	return _url;
}

(function () {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		if (!(webP.height == 2)) {
			//not webp supported
			console.log('webp not supported');
			(function () {
				var images = document.getElementsByTagName('img');
				for (var i = 0; i < images.length; i++) {
					if (images[i].src.match('img/public/images')) {
						images[i].src = addParameterToURL(images[i].src, 'fm=default');
					}
				}
			})()
		}
	};
	webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
})();

function toggleStickyForm($operation, $object) {
	if ($operation == 'hide') {
		$(".sticky-form").removeClass("visible");
		$("#body").removeClass("has-overlay").removeClass("has-cancellable-overlay");
	}
	if (!$object)
		return false;
	if (!$object.hasClass('sticky-form')) {
		$object.addClass('sticky-form');
		$object.on('click', function (e) {
			e.stopPropagation();
		});
		$object.prepend('<span style="position:relative;top:-40px;"><span class="close" style1="position: absolute;right: 5px;top: 1px;z-index:100;">X</span></span>');
		$object.on('click', '.close', function () {
			toggleStickyForm('hide', $("this").parent());
		});
		$object.find('form').submit(function (event) {
			var applyForm = this;
			if (!applyForm.checkValidity()) {
				if (applyForm.reportValidity) {
					event.preventDefault();
					applyForm.reportValidity();
				} else {
					//alert(msg.ieErrorForm);
				}
			} else {
				//applyForm.submit();
			}
		});
	}
	if ($operation == 'show') {
		$(".sticky-form.visible").removeClass('visible');
		$object.addClass('visible');
		$("#body").addClass("has-overlay").addClass("has-cancellable-overlay");
	}
}

function addStickyForm($object, $openonload) {
	$openonload = (typeof $openonload != 'undefined') ? $openonload : false;
	console.log('xx', $openonload);
	toggleStickyForm('hide', $object);
	$firstform = 0;
	if ($('.sticky-bottom-nav').length == 0) {
		$("body").append('<div class="sticky-bottom-nav hideable"></div>');
		$firstform = 1;
	}
	if($openonload){
		$("body .sticky-bottom-nav").removeClass('hideable');
	}
	$('body .sticky-bottom-nav').append('<a class="sticky-bottom-btn active" data-target="'+$object.attr('data-html-id')+'" data-form-section="'+$object.attr('data-html-id')+'">' + ($object.find('h2').text()) + '</a>');
	$('[data-target="#' + ($object.attr('id')) + '"],[data-target="#' + ($object.data('id')) + '"],.sticky-bottom-btn:last-of-type').removeAttr('data-target').on('click', function (e) {
		e.stopPropagation();
		toggleStickyForm('show', $object);
	});
	if ($openonload && deviceType == 'desktop') {
		toggleStickyForm('show', $object);
		window.addEventListener('scroll', function (e) {
			var $window = $(window);
				if (!$('body').hasClass('stickyform-auto-closed') && $window.scrollTop() > ($window.height() / 2)) {
					$('body').addClass('stickyform-auto-closed');
					toggleStickyForm('hide', $object);
				}
		})
	}
	if($firstform){
		window.addEventListener('scroll', function (e) {
			var $window = $(window);
			if($window.scrollTop() > ($window.height() / 3)){
				$(".sticky-bottom-nav.hideable").addClass('show');
			}
			else{
				$(".sticky-bottom-nav.hideable").removeClass('show');
			}
		})
	}
}

function showInModal(html) {
	if (html.length > 0) {
		var newModal = $('#modal');
		newModal.find('.modal-title').text('');
		newModal.find('.modal-body').html(html);

		newModal.modal('show');
		newModal.on('hidden.bs.modal', function () {
			newModal.find('.modal-title').text('');
			newModal.find('.modal-body').html('');
		})
	}
}

function addParameterToURL(url, param) {
	_url = url;
	_url += (_url.split('?')[1] ? '&' : '?') + param;
	return _url;
}

// function flashMessage($message,$type){
// 	$('body').prepend('<div class="flash-alert text-center alert alert-' + ((typeof $type != 'undefined') ? $type : 'success') + '">' + $message+ '</div>');
// }

function showToastMessage($message,$type){
	if($message.length == 0)
		return false;
	if($('.flash-alert').length == 0){
		$('body').prepend('<div class="flash-alert text-center alert"></div>');
		$('.flash-alert').on('click', function () {
			$(this).remove();
			$("body").removeClass('with-toast-message');
		});
	}
	$('.flash-alert').addClass('alert-' + ((typeof $type != 'undefined') ? $type : 'success')).html($message);
	$('body').addClass('with-toast-message');
	
}

function slugify(Text) {
  return Text.toLowerCase()
             .replace(/[^\w ]+/g, '')
             .replace(/ +/g, '-');
}

if(typeof jma_app == 'undefined'){
	var jma_app = {
		'ready':0,
		'functions':[]
	};
}
if(typeof executeOnReady == 'undefined'){
	executeOnReady = function(func){
		if(typeof func != 'function')
			return false;
		if(jma_app.ready){
			func();
		}
		else{
			jma_app.functions.push(func)
		}
	}
}



$(document).ready(function () {

	window.onresize = function (event) {
		resizeDiv();
	}

	resizeDiv();

	$.ajaxSetup({
	    xhrFields: {
	       withCredentials: true
	    },
	    crossDomain: true
	});

	$('body').on('submit', '.async-form', function (e) {
		e.preventDefault();
		$(this).find('[data-async="true"]').eq(0).trigger('click');
	})
	//<a href="/Default/Link.html"     data-endpoint="/Ajax/Link.html"     data-target="targetId"     data-cache="false",    data-async="true">Click me!</a>
	$('body').on('click', '[data-async="true"]', function (e) {
		e.preventDefault();
		var self = $(this),
			url = self.data('endpoint'),
			target = self.data('target'),
			cache = self.data('cache');
		method = self.data('method') ? self.data('method') : 'GET',
			form = self.data('form') ? $(self.data('form')) : '';
		callback = self.data('callback') ? self.data('callback') : '';
		if ($("[name*=submission\\[email\\]]")) {
			email = $("[name*=submission\\[email\\]]").val();
			$("[name*=couponEmail").val(email);
		}
		window.data = data = $(form).serialize();
		if (method == 'POST') {
			data += '&_token=' + $("meta[name=csrf-token]").attr('content');
		}

		$.ajax({
			url: url,
			cache: cache,
			method: method,
			data: data,
			success: function (data) {

				data = $($.parseHTML('<html>' + data + '</html>', document, true));
				if (data.find(target).length > 0) {
					$(target).html(data.find(target).html());
				}
				else {
					$(target).html(data.html());
				}
				executeFunction(callback, data);
			}
		});
	});
	if (typeof $_GET['message'] != 'undefined') {
	//	flashMessage($_GET['message'],(typeof $_GET['messagetype'] != 'undefined')?$_GET['messagetype']:'')
		showToastMessage($_GET['message'],(typeof $_GET['messagetype'] != 'undefined') ? $_GET['messagetype'] : 'success');
		//$('body').prepend('<div class="flash-alert text-center alert alert-' + ((typeof $_GET['messagetype'] != 'undefined') ? $_GET['messagetype'] : 'success') + '">' + $_GET['message'] + '</div>');
		try {
			history.pushState({}, '', window.location.origin + window.location.pathname);
		}
		catch (e) { }
	}


	function regenerateCsrf() {
		if ($('input[name=_token]').length > 0) {
			$.post($base_path + '/csrf', function ($data) {
				$('meta[name="csrf-token"]').attr('content', $data);
				$("input[name=_token]").val($data);
				$.ajaxSetup({
					headers: {
						'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
						"X-Requested-With":'XMLHttpRequest'
					},
					xhrFields: {
			       withCredentials: true
			    },
			    crossDomain: true
				});
			})
		}
	}
	regenerateCsrf();
	setInterval(function () {
		regenerateCsrf();
	}, 240000) //4 mins

	if (typeof $_GET['utm_source'] != 'undefined') {
		$('form').each(function () {
			$(this).prepend('<input type="hidden" name="source" value="' + $_GET['utm_source'] + '">');
		})
	}

	loadScript(JS_PATH + '/device_storage.js?mod=' + file_version, function () {


		var $userData = getCookie('oauth_user');
		if ($userData) {
			$userData = $.parseJSON($userData ? $userData : '{}');
			$newUserData = {
				'first-name': getNode($userData, 'user_first_name'),
				'last-name': $.trim(getNode($userData, 'user_middle_name') + ' ' + getNode($userData, 'user_last_name')),
				'city': getNode($userData, 'user_city'),
				'country': getNode($userData, 'user_country'),
				'state': getNode($userData, 'user_state'),
				'mobile': getNode($userData, 'user_phone'),
				'email': getNode($userData, 'user_email'),
				'dob': getNode($userData, 'user_dob'),
				'sso-id': getNode($userData, 'user_ev_guid')
			}
			$newUserData['name'] = $.trim($newUserData['first-name'] + ' ' + $newUserData['last-name']);
			setLocalStorage('sso_data', $newUserData, 1);
		}
		else {
			$(".ie-sso-btn").html('<a href="' + $base_path + '/ie-oauth/login' + '">Login</a>')
			$('.ie-sso-btn a').on("click", function (e) {
				//$(this).customPopup(e);	
				e.preventDefault();
				createPopupWin($(this).attr('href'), 'Login', 400, 600);
			});
		}

		$app['user'] = { 'sso': {}, 'last_form': {} };
		if ($userData = getLocalStorage('sso_data')) {
			$app['user']['sso'] = $userData;
		}

		if ($userData = getLocalStorage('last_form_data')) {
			$app['user']['last_form'] = $userData;
		}

		if (typeof auth_user !='undefined') {
			$app['user']['auth_user'] = auth_user;
		}
		var prefill = 0;
		if (prefill && ($app['user']['sso'] || $app['user']['last_form'] || $app['user']['auth_user'])) {
			$userData = $.extend({}, $app['user']['last_form'], $app['user']['sso'],$app['user']['auth_user']);
			$('form:not(.autofill-disabled)').each(function () {
				$(this).find('[id]').each(function () {
					if ($(this).val() == '' || $(this).val() == null) {
						$key = $(this).attr('id').replace(/submission\[(.*)\]/g, '$1');
						if (!($key == 'otp-mobile' || $key == 'otp-email')) {
							$(this).val(getNode($userData, $key));
						}
					}
				})
			})
		}

	}, false);


	if ($('.imgal-container').length > 0) {
		loadCss(JS_PATH + '/../css/imgal.min.css?q=8');
		loadScript(JS_PATH + '/imgal.js?q=5', function () {

		})
	}

	if ($('.twitter-widget').length > 0) {
		//loadScript(JS_PATH + '/tweets.js?mod=5', function () {}) //api not working
	}

	$('form button[type=submit]').on('click', function (e) {
		var $form = $(this).parents('form');
		var $userData = {};
		$form.find('[id]').each(function () {
			if ($(this).val() != '') {
				$key = $(this).attr('id').replace(/submission\[(.*)\]/g, '$1');
				if (!($key == 'otp-mobile' || $key == 'otp-email')) {
					$userData[$key] = $(this).val();
				}
			}
		});
		if (typeof $userData['name'] == 'undefined') {
			$userData['name'] = $.trim(((typeof $userData['first-name'] != 'undefined') ? $userData['first-name'] : '') + ' ' + ((typeof $userData['last-name'] != 'undefined') ? $userData['last-name'] : ''));
		}
		var $newUserData = $.extend({}, getLocalStorage('last_form_data'), $userData);
		setLocalStorage('last_form_data', $newUserData, 30);
	})


	$('body').on('click', 'button.autosavebtn', function (e) {
		$form = $(this).parents('form').eq(0);
		var form = $form;
		var url = form.attr('action').replace($base_path, $base_path + '/ajax');
		$.ajax({
			type: "POST",
			url: url,
			data: form.serialize(), // serializes the form's elements.
			success: function (data) {
				try {
					if (typeof data.response != 'undefined') {
						if (typeof data.response['elements'] != 'undefined') {
							$.each(data.response['elements'], function (i, v) {
								console.log('name=' + i);
								$form.find(['name=' + i]).val(v).attr('value', v);
							});
							showToastMessage('Changes have been autosaved');
						}
						if (typeof data.response['action'] != 'undefined') {
							$form.attr('action', data.response['action']);
						}
					}
					//console.log(data); // show response from the php script.
				} catch (e) { }

			}
		});
	});
	if ($('button.autosavebtn').length > 0) {
		setInterval(function () {
			$('button.autosavebtn').trigger('click');
		}, 60000)
	}


	setTimeout(function () {
		$('div.flash-alert').remove();
	}, 12000);


	$(".form-v2 .form-group").each(function () {
		if ($(this).find('input[type!=hidden],select').length > 0) {
			$(this).addClass('two-column');
		}
		else
			$(this).addClass('two-column-clearfix');
	});

	if ($('textarea.richeditor').length > 0) {
		loadScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.2.0/tinymce.min.js', function () {
			tinymce.init({
				height: '150',
				selector: 'textarea.richeditor',
				plugins: [
					'autolink link lists hr anchor',
					'wordcount',
					'table paste'
				],
				toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify |' +
					' bullist numlist outdent indent | link | ',
				menubar: '',
				setup: function (ed) {
					ed.on('init', function (e) {
						//$("#"+ed.id).data("outoflimit", (getTinyMceCountStats(ed.id).words  > $("#"+ed.id).attr("maxwords")?true:false));
						//numInitInst++;
						//if(numInitInst == tinymce.EditorManager.editors.length)ETB2BAwards.form.validate(0);
					});
					ed.on("blur", function (ed) {
						setTimeout(function () {
							tinymce.triggerSave();
						}, 100)
					});
					ed.on('keyup', function (e) {
						//$("#"+ed.id+"_err").text('');
						//$("#"+ed.id).data("outoflimit", (getTinyMceCountStats(ed.id).words  > $("#"+ed.id).attr("maxwords")?true:false));
						//var count = countTinyMceChars();
						//document.getElementById("character_count").innerHTML = "Characters: " + count;
					});
				},
			});
			$("textarea[name]").attr('tabIndex', -1);
		});
	}

	function getTinyMceCountStats(id) {
		var body = tinymce.get(id).getBody(), text = tinymce.trim(body.innerText || body.textContent);

		return {
			chars: text.length,
			words: text.split(/[\w\u2019\'-]+/).length - 1
		};
	}
	// Scroll to a Specific Div
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function (e) {
			var target = $(this).attr('data-target');
			if ($(target).length == 0) {
				return false;
			}
			e.preventDefault();
			e.stopPropagation();

			// animate
			var offset = (typeof $fixedheaderobject !='undefined')?$fixedheaderobject.height():( ($('.fixed-header:visible').length > 0) ? $('.fixed-header').height() : 105);
			console.log('headerofset', offset);
			$('html, body').animate({
				scrollTop: $(target).offset().top - offset
			}, 1500);
			if ($(this).parents('.mobile-menu').length > 0) {
				$('body').removeClass('mobile-menu-visible');
			}

		});
	}
	/*
	$('.tree-list').each(function(){
		//$(this).children().addClass('hide');
		$(this).children().each(function(){
			if($(this).find('>.tree-list').length > 0)
			$(this).prepend($('<span>'+'+'+'</span>').css({'position':'absolute','margin-left':'-20px'}));	
		})		
	})
	$('.tree-list').eq(0).children().removeClass('hide');
	*/
	$('.fancy-table').each(function () {
		doubleScroll($(this).get(0));
	});
	try {
		if (!($('.main-content').children().eq(0).attr('id').match(/carousel/g))) {
			$('.main-header').addClass('fixed-header').each(function () {
				var $bg = $('<div id="main-header-bg"></div>');
				$bg.css({ 'height': $('.main-header').height() });
				setTimeout(function ($bg) {
					$bg.css({ 'background-color': $('.main-header').css('background-color') });
				}, 500, $bg);
				$('.main-content').prepend($bg);
			});
		}
	} catch (e) { }

	$('.item-link[href*=indianexpress1],.item-link[href*=youtube]').on('click', function (e) {
		//$('.item-link[href*=youtube]').on('click',function(e){
		if (true || isExternalUrl($(this).attr('href'))) {
			var newModal = $('#modal');
			var videoId = getYoutubeParts($(this).attr('href'));
			var href = $(this).attr('href');
			if (videoId.length > 0)
				href = '//www.youtube.com/embed/' + videoId[0] + '?' + videoId[1] + '&autoplay=1';

			newModal.find('.modal-title').text('');
			newModal.find('.modal-body').html('<iframe allow="autoplay" frameborder="0" allowfullscreen src="' + href + '" style="width:100%;height:500px;"></iframe>');

			newModal.modal('show');
			newModal.on('hidden.bs.modal', function () {
				newModal.find('.modal-title').text('');
				newModal.find('.modal-body').html('');
			})
			e.preventDefault();
			return false;
		}
		return true;
	});

	$("[name*=submission\\[otp-mobile\\]]").each(function () {
		$(this).parent().prepend('<div class="btn-group"></div>');
		$(this).parent().find('label').hide();
		$btngroup = $(this).siblings('.btn-group');
		$btngroup.append('<button type="button" data-field="submission\\[mobile\\]" data-type="mobile" class="send_otp btn btn-primary form-control">Request Mobile OTP</button>');
		$(this).attr('placeholder', 'Enter OTP received on mobile').appendTo($btngroup);
		//$btngroup.append('<button type="button" data-field="submission\\[mobile\\]" data-type="mobile" class="validate_otp btn btn-primary form-control" disabled="">Validate</button>');
	});
	$("[name*=submission\\[otp-email\\]]").each(function () {
		$(this).parent().prepend('<div class="btn-group"></div>');
		$(this).parent().find('label').hide();
		$btngroup = $(this).siblings('.btn-group');
		$btngroup.append('<button type="button" data-field="submission\\[email\\]" data-type="email" class="send_otp btn btn-primary form-control">Request Email OTP</button>');
		$(this).attr('placeholder', 'Enter OTP received on email').appendTo($btngroup);
		//$btngroup.append('<button type="button" data-field="submission\\[mobile\\]" data-type="mobile" class="validate_otp btn btn-primary form-control" disabled="">Validate</button>');
	});
	$(".send_otp").on("click", function () {
		$field = '[name=' + $(this).data('field') + ']';
		$fieldobj = $(this).closest('form').find($field);
		if ($fieldobj.length == 0 || !$fieldobj.val()) {
			return false;
		}
		$(this).attr('disabled', 'disabled');
		var type = $(this).data('type');
		setTimeout(function () {
			$(".send_otp[data-type=" + type + "]").removeAttr('disabled');
		}, 30000);
		$.post($base_path + "/api/requestotp/" + $(this).data('type'), { 'destination': $fieldobj.val() }, function ($data) {
			$msg = 'OTP Sent, Please check spam / junk folder in case not found.'
			try {
				$data = JSON.parse($data);
				if ($data[1] == 'mobile') {
					$msg = 'OTP Sent to your Number, If OTP is not received then try again after 30 seconds';
				}
				else {

				}
			} catch (e) { }
			alert($msg);
		}).fail(function () {
			alert("Validation Failed, Please retry with correct details");
		});
	});


	$(document).on('click', '#body.has-cancellable-overlay:not(.with-toast-message)', function () {
		toggleStickyForm('hide');
	})

	if (typeof $_GET['show_only_section'] != 'undefined') {
		addDynamicCss('.is-section,section[id],.main-header,.copyrightbox,.social-share-wdgt,.sticky-bottom-nav,.scroll-to-top,#main-header-bg{display:none !important;}');
		addDynamicCss('#body [id="' + $_GET['show_only_section'] + '"],#body [id="section-' + $_GET['show_only_section'] + '"]{display:block !important}');
	}

	if (env != 'live' || (env == 'live' && eventId > 68)) {
		loadScript(JS_PATH + '/isinviewport.min.js', function () {

			$(window).on('scroll',function () {

				$("section[id]").each(function () {

					//if ($(this).is(':in-viewport(90)')) {
					//if ($(this).is(':in-viewport')) {
					if ($(this).is(':in-viewport(0)')) {
						$(".navigation a[data-target='#" + $(this).attr('id') + "']").addClass('active').parent().addClass('active');
					} else {
						$(".navigation a[data-target='#" + $(this).attr('id') + "']").removeClass('active').parent().removeClass('active');;
					}
					if ($(this).is(':in-viewport(0)')) {
						$(this).addClass('inViewPort');
						$(this).find('.animatable').addClass('animate');

						if($(this).hasClass('has-counter') && !$(this).hasClass('counter-rendered')){
							$(this).addClass('counter-rendered');

							let a = $(this).find(".counter").get();
							let arrays = Array.from(a); // converting in array

								arrays.map((items) => {
								  let count = 0;

								  function counterUp(){
								  	var step = parseInt(items.dataset.number / 10);
								  	if(step <=1)
								  	{
								  		step = 1;
								  	}

								    count = count + step;
								    

								    if(count >= items.dataset.number){
								    	count = items.dataset.number;
								      clearInterval(stop)  // for stop increments
								    }
								    items.innerHTML = count;
								  }
								  let stop = setInterval(() => {
								    counterUp()
								  }, items.dataset.speed);  // (1000 / item.dataset.speed ) for ending same time in all values from counter
							});
						}



					} else {
						$(this).removeClass('inViewPort');
						$(this).find('.animatable').removeClass('animate');
					}
				})

			})

			if($("#section-article_detail").length > 0){
				$(window).on('scroll',function () {
					$(".iframe-lazy").each(function () {
						if ($(this).is(':in-viewport(0)')) {
							$(this).attr('src',$(this).attr('data-src')).removeClass('iframe-lazy');
						}
					})
				})
			}
		})
	}

	$.fn.reverse = function() {
	    return this.pushStack(this.get().reverse(), arguments);
	}; 


	$.fn.customPopup = function (e, intWidth, intHeight, blnResize) {
		e.preventDefault();
		intWidth = intWidth || '500';
		intHeight = intHeight || '400';
		strResize = (blnResize ? 'yes' : 'no');
		var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Action Required'),
			strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
			objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
	}
	addSocialShareWdgt(1);

	$.fn.isInViewPort = function (inCallback, outCallback) {
		elem = this;
		inCallback = ((typeof inCallback == 'function') ? inCallback : function (e) { });
		outCallback = ((typeof outCallback == 'function') ? outCallback : function (e) { });
		if ($(elem).data('isInViewportFunctionBound')) {
			return false;
		}
		$(elem).data('isInViewportFunctionBound', 1);
		window.addEventListener('scroll', function (e) {
			var $window = $(window)
			var viewport_top = $window.scrollTop()
			var viewport_height = $window.height()
			var viewport_bottom = viewport_top + viewport_height
			var $elem = $(elem)
			var top = $elem.offset().top
			var height = $elem.height()
			var bottom = top + height
			var isInViewport = (top >= viewport_top && top < viewport_bottom) ||
				(bottom > viewport_top && bottom <= viewport_bottom) ||
				(height > viewport_height && top <= viewport_top && bottom >= viewport_bottom);
			if (isInViewport) {
				inCallback(elem);
			} else {
				outCallback(elem);
			}

		})
	}
	//var $defaultform = $("#section-custom-html form").eq(0);
	//if ($defaultform.length > 0) {
		//addStickyForm($defaultform.parents('section[id]'),true)
	//}
	//const tnc = $('#body label[for=submission\\[terms-condition\\]]');
	//tnc.html("By Submitting This Form, You agree to share your contact details with the partners for the purpose of following up on your interests.");
	addStickyForm($('[data-html-id=form_sponsor_form]'));
	$(".cta-btn.primary-button").on('click',function(e){
		e.stopPropagation();
		toggleStickyForm('show',$('[id=section-custom-html][data-html-id]:eq(0)'));
	});
	$(".cta-btn.sponsor-button").on('click',function(e){
		e.stopPropagation();
		toggleStickyForm('show',$('[data-html-id=form_sponsor_form]'));
	});
	

	
	jma_app.ready = 1;
	jma_app.temp_functions = [].concat(jma_app.functions);
	jma_app.functions = [];
	jma_app.temp_functions.forEach(function(func){
		func();
	});
	jma_app.temp_functions = [];


})


