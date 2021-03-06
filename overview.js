var translatedField;
var originalField;
var originalLangField;
var translatedLangField;
var checkLearnForm;

Ext.onReady(function(){
	Ext.QuickTips.init();
	
	originalField = new Ext.form.TextArea({
    	id: 'original',
    	fieldLabel: LANG("ORIGINAL_FIELD_TITLE") ,
    	allowBlank: false,
		readOnly: false,
    	anchor : '100%'
	});
	
	translatedField = new Ext.form.TextArea({
    	id: 'translated',
		style: "border:0; background-image:none",
    	anchor: '95%',
		hideLabel: true,
		readOnly: true,
		value: '',
		hidden: false
	});
	
	originalLangField = new Ext.form.ComboBox({
		id: 'originalLang',
    	fieldLabel: LANG("FROM"),
		labelAlign: "right",
	    triggerAction: 'all',
		width:120,
		allowBlank: false,
	    mode: 'local',
		forceSelection: true,
		readOnly: false,
	    store: new Ext.data.ArrayStore({
	        id: 0,
	        fields: ['name','displayText'],
	        data: languagesArray
	    }),
	    valueField: 'name',
	    displayField: 'displayText'
	})
	
	translatedLangField = new Ext.form.ComboBox({
		id: 'translatedLang',
	    triggerAction: 'all',
		width:120,
		allowBlank: false,
	    mode: 'local',
		forceSelection: true,
		readOnly: false,
	    store: new Ext.data.ArrayStore({
	        id: 0,
	        fields: ['name','displayText'],
	        data: languagesArray
	    }),
	    valueField: 'name',
	    displayField: 'displayText'
	})

	var fromLabel=new Ext.form.Label({
		text:LANG('FROM')
	});
	
	var toLabel=new Ext.form.Label({
		text:LANG('TO')
	});
	
	var buttonTranslate = new Ext.Button({
		width:110,
		text: LANG("BUTTON_TRANSLATE_NOW"),
		handler: translateNow
	});
	
	var buttonReadOrg = new Ext.Button({
		width:100,
		text: LANG("BUTTON_READ_ORIGINAL"),
		handler: readOriginal
	});
	
	var buttonReadTranslated = new Ext.Button({
		width:100,
		text: LANG("BUTTON_READ_TRANSLATED"),
		handler: readTranslated
	});

	var buttonSwap = new Ext.Button({
		width:30,
		text: LANG("BUTTON_SWAP"),
		handler: swap
	});
	
	var mainForm = new Ext.FormPanel({
            labelAlign: 'top',
            bodyStyle:'padding:5px',
            width: 770,
            items: [{
                xtype:'box',
                id:'instruction',
                fieldLabel:LANG("MAIN_DESC_TITLE"),
                            hideLabel: true,
                            cls:'memorizeInstruction',
                            html:LANG("MAIN_DESC_HTML"),
            },{
		border:true,
                items:[{
                    xtype: 'fieldset',
                    layout: 'form',
                    border:false,
                    style: 'margin-bottom:0;padding-bottom:0',
                    items: [originalField]
		},{ 
                    xtype: 'fieldset',
                    title: LANG("Quick Translate"),
                    border: false,
                    style: 'margin-bottom:0;padding-bottom:0',
                    items : [
                            fromLabel,
                            new Ext.Spacer({width:5}),
                            originalLangField,
                            new Ext.Spacer({width:5}),
                            buttonSwap,
                            new Ext.Spacer({width:5}),
                            toLabel,
                            new Ext.Spacer({width:5}),
                            translatedLangField,
                            new Ext.Spacer({width:5}),
                            buttonTranslate,
                            new Ext.Spacer({width:5}),
                            buttonReadOrg,
                            new Ext.Spacer({width:5}),
                            buttonReadTranslated
                    ],
                    layout:'hbox',
                    layoutConfig: {
                            padding: 0,
                            labelAlign: 'left'
                    }
                },{
                    xtype: 'fieldset',
                    hideLabel: true,
                    style: 'margin-bottom:0;padding-bottom:0',
                layout: 'form',
                border:false,
                items: [translatedField]
			}]
		}],
    buttons: [],
	buttonAlign:'left'
    });

	//hint view
	
	var hintForm = new Ext.FormPanel({
            labelAlign: 'top',
            bodyStyle:'padding:5px',
            width: 770,
            title: LANG("MEMORIZE_FORM_TITLE"),
            items: [{
                border:true,
                items:[{
                        xtype:'box',
                        id:'instruction',
                        fieldLabel:LANG("MAIN_DESC_TITLE"),
                        hideLabel: true,
                        cls:'x-form-item',
                        html:LANG("HINT_DESC_HTML"),
                }]
            }]
	});

	var hintForm = new Ext.FormPanel({
            labelAlign: 'top',
            bodyStyle:'padding:5px',
            width: 770,
            items: [{
                border:true,
                items:[{
                        xtype:'box',
                        id:'instruction',
                        fieldLabel:LANG("MAIN_DESC_TITLE"),
                        hideLabel: true,
                        cls:'x-form-item',
                        html:LANG("HINT_DESC_HTML"),
                }]
            }]
	});

        checkLearnForm = new Ext.FormPanel({
            labelAlign: 'top',
            bodyStyle:'padding:5px',
            width: 770,
            title: LANG("CHECK_LEARN_TITLE"),
            items: [{
                border:false,
                items:[{
                        xtype:'box',
                        id:'checkLearn',
                        fieldLabel:LANG("CHECK_LEARN_TITLE"),
                        hideLabel: true,
                        cls:'x-form-item',
                        html:LANG("CHECK_LEARN_HTML"),
                }]
            }]
	});

	originalLangField.setValue(fromLangManual);
	translatedLangField.setValue(toLangManual);
	mainForm.render('mainDiv');
	hintForm.render('hintDiv');
        checkLearnForm.render('checkLearnDiv');
        showOrHideLearnForm();
        $('#learnLink').click(function (){parent.tabs.setActiveTab(1)});
	
});