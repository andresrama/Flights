
/**
 * Created by and-y on 12/30/2015.
 */
"use strict";
$(document).ready(function() {
    jQuery('#from-time-field').datetimepicker({
        autoclose:true,
        minview:'day',
        fontAwesome:true,
        pickerPosition:"top-right"
    });
    jQuery('#to-time-field').datetimepicker();

});