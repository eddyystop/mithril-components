/*global m:false */
var mc = mc || {};

mc.BootstrapForm = (function () {
  var counter = 0;
  var copyAttrs = function (attrs, config, skip) {
    for (var name in config) {
      if ((name == 'class' || name == 'className') && skip.indexOf('class') == -1) {
        if (attrs.class) attrs.class += ' ' + config.class;
        else attrs.class = config.class;
      }
      if (skip.indexOf(name) == -1) attrs[name] = config[name];
    }
  };

  var bsf = {
    form: function (config, contents) {
      if (Array.isArray(config) || typeof config == 'function') {
        contents = config;
        config = {};
      }
      var attrs = {};
      copyAttrs(attrs, config, ['inline', 'horizontal']);
      if (config.inline) attrs.class += ' form-inline';
      if (config.horizontal) attrs.class += ' form-horizontal';
      return m('form', attrs, contents);
    },

    input: function (ctrl, config) {
      config = config || {};
      var id = config.id || ('bsf-id-' + counter++),
        attrs = {
          type: config.type || 'text',
          id: id
        };

      copyAttrs(attrs, config, ['id', 'value', 'label', 'help']);
      if (config.value) {
        attrs.value = ctrl[config.value]();
        attrs.onchange = m.withAttr('value', ctrl[config.value]);
      }

      var els = [
        m('label.control-label', {
            'for': id
          },
          config.label
        ),
        m((config.rows ? 'textarea' : 'input') + '.form-control', attrs)
      ];

      if (config.help) els.push(m('span.help-block', config.help));

      return m('div.form-group', els);
    },
    checkbox: function (ctrl, config) {
      config = config || {};
      var iAttrs = {
          type: 'checkbox'
        },
        dAttrs = {};

      copyAttrs(iAttrs, config, ['type','class', 'inline', 'value', 'checked', 'label']);
      copyAttrs(dAttrs, config, ['value', 'inline', 'checked', 'label']);

      if (config.value) {
        if (ctrl[config.value]()) iAttrs.checked = 'checked';
        iAttrs.onclick = m.withAttr('checked', ctrl[config.value]);
      }
      if (config.inline) dAttrs.class += ' checkbox-inline';
      return m('div', dAttrs,
        m('label.control-label', (config.inline ? {
          class: 'checkbox-inline'
        } : {}), [
          m('input', iAttrs),
          config.label
        ])
      );
    },
    radio: function (ctrl, config) {
      config = config || {};
      var iAttrs = {
          type: 'radio'
        },
        dAttrs = {};

      copyAttrs(iAttrs, config, ['class', 'inline', 'value', 'checked', 'label', 'options']);
      copyAttrs(dAttrs, config, ['type', 'value', 'inline', 'checked', 'label', 'options']);

      if (!iAttrs.name) iAttrs.name = 'bsf-id-' + counter++;

      var value = config.value;
      if (value) {
        iAttrs.onclick = function (e) {
          var target = e.target;
          ctrl[value](target.checked && target.value);
        };
      }
      if (config.inline) dAttrs.class += ' checkbox-inline';
      return config.options.map(function (opt) {
        if (value && ctrl[value]() == opt.value) iAttrs.checked = 'checked';
        else delete iAttrs.checked;
        iAttrs.value = opt.value;
        return m('div.radio', dAttrs,
          m(
            'label.control-label',
            (config.inline ? {class: 'radio-inline'	} : {}),
            [
              m('input', iAttrs),
              opt.label
            ]
          )
        );
      });
    },

    static: function (config) {
      config = config || {};
      var attrs = (config.class ? {
        class: config.class
      } : {});

      return m('div.form-group', attrs, [
        m('label.control-label', config.label),
        m('p.form-control-static', config.value)
      ]);
    },
  };

  return bsf;
})();