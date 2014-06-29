A form builder using Tweeter Bootstrap
======================================

Simplifies building of stylish forms using Tweeter's [Bootstrap CSS](http://getbootstrap.com/css/).

Usage
-----

	var app = {

		controller: function () {
			this.firstName = m.prop('John');
			this.lastName = m.prop('Doe');
			this.active = m.prop();
			this.lorenIpsum = m.prop('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
			this.size = m.prop('M');
		},

		view: function (ctrl) {
			var bsf = mc.BootstrapForm;
			return bsf.form({
				style: 'border: thin solid gray;padding:1em'
			}, [
				bsf.input(ctrl, {
					label: 'First Name',
					value: 'firstName'
				}),
				bsf.input(ctrl, {
					label: 'Last Name',
					value: 'lastName'
				}),
				bsf.checkbox(ctrl, {
					label: 'Active',
					value: 'active'
				}),
				bsf.input(ctrl, {
					label: 'Something really long',
					value: 'lorenIpsum',
					rows: 5
				}),
				bsf.radio(ctrl, {
					label: 'T-shirt size',
					value: 'size',
					options: [
						{label: 'Extra-small', value:'XS'},
						{label: 'Small', value:'S'},
						{label: 'Medium', value:'M'},
						{label: 'Large', value:'L'},
						{label: 'Extra-large', value:'XL'}
					]
				})
			]);
		}
	};

	m.module(document.body, app);

Description
-----------

The component is a collection of view elements as Mithirl would normally produce via the `m()` method.  It does not contain any controller.  It simplifies the somewhat complex structure of the HTML and classNames required to apply the styles provided by the Bootstrap CSS.

It's only dependency beyond Mithril itself is a link to the Bootstrap CSS file.  It does not use the components supported by the Bootstrap JS files.

Components
----------

The following componets are available

* form
* input (includes textarea)
* checkbox
* radio
* static (no input, just for display purposes)

In general, all the components, expect a reference to the controller as the first argument and a configuration object. Some components do not require the controller (such as `static`, sometimes `form`).  Though the configuration object is optional, it would be a very dull control if none was provided.  Except for the configuration properties listed below for each, every other property will be passed through to the corresponding DOM element.  Such is the case of the `style` attribute in the form, above, which is directly applied to the form, untouched.

###Form###

The `BootstrapForm.form` component expects the following arguments:

* `config` {Object} (optional), configuration object, containing:
	* `inline` {Boolean} produces an form with its elements placed in one line ([see](http://getbootstrap.com/css/#forms-inline))
	* `horizontal` {Boolean} produces a form with the labels in the same line as the input control ([see](http://getbootstrap.com/css/#forms-horizontal));
* `contents` {Array | function} The contents of this form.  Elements produced by Mithrils own `m()` method can be freely intermixed with the form elements listed below.

###Input###

The `BootstrapForm.input` component expects the following  arguments:

* `ctrl` {Mithril controller} a reference to the controller received by the view that contains this component.
* `config` {Object} Configuration object containing:
	* `id` {String} If an id for the element is not provided, one will be generated so as to associate the `LABEL` element with the input control via the `for` attribute.
	* `type` {String} type of input control to be used.  It defaults to `text`.  Any of the ones listed [here](http://getbootstrap.com/css/#forms-controls) can be used (except for `password` the rest depend on HTML5 support on the browser).  It should not be set to `checkbox`, `radio` and it will be ignored if the `rows` property is set.
	* `label` {String} The contents of the `LABEL` element associated to this control.
	* `value` {String} If present, it should be the name of a property setter/getter in the controller.  The input will be bi-directionally bound to this property.  The property will be set on the `onchange` event.
	* `help` {String} Help text to be shown below the input control ([see](http://getbootstrap.com/css/#forms-help-text))
	* `rows` {Integer} If present a `TEXTAREA` of the given height will be used instead of a plain INPUT textbox.
	* `class` {String} Additional class names to be appended beyond those required by Bootstrap.
	
The `disable`, `placeholder` and `readonly` attributes, mentioned in the [Bootstrap documentation](http://getbootstrap.com/css/#forms-control-disabled) are simply passed through and will produce the expected behavior.
	
###Checkbox###

The `BootstrapForm.checkbox` component expects the following  arguments:

* `ctrl` {Mithril controller} a reference to the controller received by the view that contains this component.
* `config` {Object} Configuration object containing:
	* `id` {String} If an id for the element is not provided, one will be generated so as to associate the `LABEL` element with the input control via the `for` attribute.
	* `label` {String} The contents of the `LABEL` element associated to this control.
	* `value` {String} If present, it should be the name of a property setter/getter in the controller.  The input will be bi-directionally bound to this property.  The property will be set on the `onclick` event.
	* `help` **TODO** {String} Help text to be shown below the input control ([see](http://getbootstrap.com/css/#forms-help-text))
	* `inline` {Boolean} Distributes the checkboxes horizontally in a single line.
	* `class` {String} Additional class names to be appended beyond those required by Bootstrap.
	
###Radio###

The `BootstrapForm.radio` component expects the following  arguments:

* `ctrl` {Mithril controller} a reference to the controller received by the view that contains this component.
* `config` {Object} Configuration object containing:
	* `name` {String} If a name for the collection is not provided, one will be generated so as to make the radio buttons sharing this name exclusive of one another.
	* `label` {String} **TODO** The contents of the `LABEL` element associated to this group of radio buttons.
	* `value` {String} If present, it should be the name of a property setter/getter in the controller.  The input will be bi-directionally bound to this property.  The property will be set on the `onclick` event to the `value` property of the active radio button.  
	* `help` **TODO** {String} Help text to be shown below the input control ([see](http://getbootstrap.com/css/#forms-help-text))
	* `inline` {Boolean} Distributes the checkboxes horizontally in a single line.
	* `class` {String} Additional class names to be appended beyond those required by Bootstrap.
	* `options` {Array of Objects}, one entry per radio button, in the order expected to be shown. It should contain:
		* `label` {String} Text to be shown along the radio button.
		* `value` {String} Value that this radio button represents.  Do not confuse this one with the `value` attribute of the group of radios.  This is the value that will be stored in the associated property getter/setter when active. 
		
###Static###

The `BootstrapForm.static` component simply shows a fixed text instead of an actual input control  [see](http://getbootstrap.com/css/#forms-controls-static). It expects the following argument:

* `config` {Object} Configuration object containing:
	* `label` {String} **TODO** The contents of the `LABEL` element associated to this group of radio buttons.
	* `value` {String} The value to be shown.  In this case it is not the name of a property getter/setter but the actual text to be shown
	
	
	
###Button###

**todo**

###Validation###

**todo**