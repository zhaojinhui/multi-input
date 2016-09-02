# multi-input
a js plug in which support input more than one tag in a input area

you can easliy import the js and css library and then add the following html code to your html file

```html
<div class="js-multi-input-container div-multi-input" style="width:500px;">
  <input class="multi-input js-multi-input" type="text" size="20" placeholder="Some Place Holder" style="width:98%"/>
</div>
```

And then call it with the following js code 

```javascript
$('.js-multi-input-container').multiInput(placeholdertext, validationfunction, validationFailResponseFunction);
```

The first variable is the input placehoder text. 
The second variable is the validation function.
And the las one is when the validation fail, what will be the response. 

And it also has a reset function, you can call it with the following js code:

```javascript
$('.js-multi-input-container').trigger('reset:container');
```

If you want to use it directly, please don't change the class name. 
If you want to change the class name please go to the multi_input.js change the relative class name to what your have already changed. 






