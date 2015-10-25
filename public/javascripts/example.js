/**
 * Created by http://blog.knoldus.com/2014/10/07/tutorial-ajax-calling-in-play-framework-2-3-4/
 */
$(function() {

    ajaxCall();

});

var ajaxCall = function() {
    var ajaxCallBack = {
        success : onSuccess,
        error : onError
    };

    jsRoutes.controllers.Application.ajaxCall().ajax(ajaxCallBack);
};

var  onSuccess = function(data) {
    alert(data);
}

var onError = function(error) {
    alert(error);
}