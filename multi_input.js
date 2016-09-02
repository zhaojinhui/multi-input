(function($){
  $.fn['multiInput'] = function (placeHolderText, validator, failResponse) {

      var containerClassName = 'js-multi-input-container';
      var defaultInputClassName = 'js-multi-input';
      var updateInputClassName = 'js-multi-input-update-value';
      var tagClassName = 'js-multi-tag';
      var tagRemoveClassName = 'js-remove-tag';

      var containerObj;
      var defaultInputObj;
      var updateInputObj;
      var tagsRemoveObj;

      var containerWidth = 0;
      var tagsTotalWidth = 0;
      var tagsMargin = 1;
      var defaultInputMinWidth = 0;
      var defaultInputMarginRight = 5;
      var defaultInputTotalPaddingValue = 0;

      var validator;
      var validatorFailResposne;

      function getInputMinumWidth() {
        var fontType = containerObj.css('font');
        var tempEl = $('<span>').hide().appendTo(document.body);
        tempEl.text(placeHolderText).css('font', fontType);
        return tempEl.width() + defaultInputTotalPaddingValue;
      }

      function initMultiInput(){
        
        containerObj = $('.' + containerClassName);
        defaultInputObj = $('.' + defaultInputClassName);
        updateInputObj = $('.' + updateInputClassName);
        tagsObj = $('.' + tagClassName);
        tagsRemoveObj = $('.' + tagRemoveClassName);
        
        containerWidth = containerObj.width();
        defaultInputMinWidth = getInputMinumWidth();
        defaultInputMinWidth = defaultInputMinWidth > containerWidth ? containerWidth:defaultInputMinWidth;
        defaultInputObj.outerWidth(containerWidth - defaultInputMarginRight);
        
        validator = validator;
        validatorFailResposne = failResponse;
      }

      initMultiInput();

      function createTag (textValue) {
        var tagHtml = '<span class="btn-multi-tag ' 
                    + tagClassName 
                    + '" style="max-width:'
                    + (containerWidth - 1)
                    + 'px">'
                    + textValue 
                    + '<span class="' 
                    + tagRemoveClassName 
                    + '" style="cursor:pointer;"><img src="remove.png" height="10px" width="10px"></span></span>';
        return tagHtml;
      }

      function createInput (inputWidth, inputValue) {
        var inputHtml = '<input class="' 
                      + updateInputClassName 
                      + ' multi-input" type="text" style="width:'
                      + inputWidth
                      + 'px" value="'
                      + inputValue
                      +'"/>'
        return inputHtml;
      }

      function tagToInput(currentTag){
        var tagText = currentTag.text();
        var tagWith = currentTag.outerWidth();
        var inputHtml = createInput(tagWith, tagText);
        var postEl = currentTag.next();
        currentTag.remove();
        $(postEl).before(inputHtml);
        $(postEl).prev().val(tagText).focus();
      }

      function inputToTag(currentInput, isUpdate){
        var postEl = currentInput.next();
        if(isUpdate) {
          containerObj.off('blur', '.' + updateInputClassName, callback);
          var inputText = currentInput.val().trim();

          if(!validator(inputText)) {
            if(validatorFailResposne)
              validatorFailResposne();
          } else {
            var tagHtml = createTag(inputText);
            currentInput.remove();
            $(postEl).before(tagHtml);
            defaultInputObj.width(getDefaultInputWidth());
          }

          containerObj.on('blur', '.' + updateInputClassName, callback);
        } else {
          var tagHtml = createTag(currentInput.attr('value'));
          currentInput.remove();
          $(postEl).before(tagHtml);
        }
      }
      
      function removeTag(currentTag){
        currentTag.remove();
        defaultInputObj.width(getDefaultInputWidth());
      }

      function getDefaultInputWidth(){
        tagsTotalWidth = 0;
        $('.' + tagClassName).each(function(){
          var currentTagWidth = $(this).outerWidth() + tagsMargin;
          getTagTotalWidth(currentTagWidth);
        });
        var currentWidth = containerWidth - tagsTotalWidth - defaultInputMarginRight;
        if(currentWidth < defaultInputMinWidth)
          return containerWidth - defaultInputMarginRight;
        else
          return currentWidth;
      }

      function getTagTotalWidth(currentWidth) {
        if(currentWidth >= containerWidth)
          tagsTotalWidth = 0;
        else if(tagsTotalWidth + currentWidth >= containerWidth)
          tagsTotalWidth = currentWidth;
        else
          tagsTotalWidth = tagsTotalWidth + currentWidth;
      }

      function callback() {
        inputToTag($(this), false);
      }

      defaultInputObj.keyup(function(e){
        if(e.keyCode==13) {
          var currentValue = $(this).val().trim();
          if(!validator(currentValue)) {
            if(validatorFailResposne)
              validatorFailResposne();
          } else {
            $(this).val('');
            var tagHtml = createTag(currentValue);
            $(this).before(tagHtml);
            defaultInputObj.width(getDefaultInputWidth());
            $(this).focus();
          }
        }
      });

      $(window).on('resize', function(){
        containerWidth = containerObj.width();
        defaultInputObj.width(getDefaultInputWidth());
      });

      defaultInputObj.focus(function(){
        containerObj.removeClass('div-multi-input');
        containerObj.addClass('div-multi-input-focus');
      });

      defaultInputObj.blur(function(){
        containerObj.removeClass('div-multi-input-focus');
        containerObj.addClass('div-multi-input');
      });

      containerObj.on('blur', '.' + updateInputClassName, callback);
      containerObj.on('click', '.' + tagRemoveClassName, function(){
        removeTag($(this).parent());
      });

      containerObj.on('keyup', '.' + updateInputClassName, function(e){
        if(e.keyCode == 13) {
          inputToTag($(this), true);
        }
      });

      containerObj.on('dblclick', '.' + tagClassName, function(){
        tagToInput($(this));
      });

      containerObj.on('reset:container', function(){
        $('.' + tagClassName).remove();
        defaultInputObj.width(getDefaultInputWidth());
      });
    }
}(window.jQuery));
