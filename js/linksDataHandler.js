var linksHandler = linksHandler || {},
    data = JSON.parse(localStorage.getItem("linksData"));

data = data || {};

(function(linksHandler, data, $) {

    var defaults = {
            linkId: "task-",
            formId: "link-form",
            dataAttribute: "data",
            deleteDiv: "delete-div"
        }, codes = {
            "1" : "#workbx",
            "2" : "#midbx",
            "3" : "#persbx"
        };

    linksHandler.init = function (options) {
		window.console&&console.log('start init');
        options = options || {};
        options = $.extend({}, defaults, options);
		
        $.each(data, function (index, params) {
        	//window.console&&console.log('data before add = ' +JSON.stringify(data));
            addElement(params);
        });

		window.console&&console.log('end init');
    };

    // Add Task
    var addElement = function(params){
        var parent = $(codes[params.code]),
            wrapper;
		window.console&&console.log('params : ' + JSON.stringify(params));
        if (!parent) {
        	window.console&&console.log('parent is null');
            return;
        }
		
		wrapper =$("<div />", {
            "class" : "linkrow"
        }).appendTo(parent);
        
        
//         window.console&&console.log('linkurl'+params.linkUrl.indexOf("http://")!= -1);
        if((params.linkUrl.indexOf("http://")== -1) && (params.linkUrl.indexOf("https://")== -1)){
        	params.linkUrl = "http://"+params.linkUrl;
        }
        $("<a />", {
            "class" : "hatch linkOver",
            "text": params.linkLabel,
            "target": "_blank",
            "href" : params.linkUrl
        }).appendTo(wrapper);
	    
		
    };

    // Remove task
    var removeElement = function (params) {
        $("#" + defaults.linkId + params.id).remove();
    };

    linksHandler.add = function() {
    	window.console&&console.log('start add');
        var inputs = $("#" + defaults.formId + " :input"),
            errorMessage = "Title can not be empty",
            id, lLabel, lUrl, tempData;

        if (inputs.length !== 3) {
            return;
        }

        lLabel = inputs[0].value;
        lUrl = inputs[1].value;

        if (!lLabel) {
            generateDialog(errorMessage);
            return;
        }

        id = new Date().getTime();

        tempData = {
            id : id,
            code: "1",
            linkLabel: lLabel,
            linkUrl: lUrl
        };

        // Saving element in local storage
        data[id] = tempData;
        localStorage.setItem("linksData", JSON.stringify(data));

        // Generate New Link Element
       addElement(tempData);

        // Reset Form
        inputs[0].value = "";
        inputs[1].value = "";
    };

    var generateDialog = function (message) {
        var responseId = "response-dialog",
            title = "Messaage",
            responseDialog = $("#" + responseId),
            buttonOptions;

        if (!responseDialog.length) {
            responseDialog = $("<div />", {
                    title: title,
                    id: responseId
            }).appendTo($("body"));
        }

        responseDialog.html(message);

        buttonOptions = {
            "Ok" : function () {
                responseDialog.dialog("close");
            }
        };

	    responseDialog.dialog({
            autoOpen: true,
            width: 400,
            modal: true,
            closeOnEscape: true,
            buttons: buttonOptions
        });
    };
    

})(linksHandler, data, jQuery);
