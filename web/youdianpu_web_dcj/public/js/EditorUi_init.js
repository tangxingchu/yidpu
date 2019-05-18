(function() {

	fetch(STATUS_URL, {"method": "get", "headers": {"Authorization": window.authorization}}).then(function(res) {
		if(!res.ok) {
			window.location.replace("/login");
		}
	})
	

	var editorUiInit = EditorUi.prototype.init;

	EditorUi.prototype.init = function() {
		editorUiInit.apply(this, arguments);
		/*
		this.actions.get('export').setEnabled(false);

		// Updates action states which require a backend
		if (!Editor.useLocalStorage) {
			mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function(req) {
				var enabled = req.getStatus() != 404;
				this.actions.get('open').setEnabled(
						enabled || Graph.fileSupport);
				this.actions.get('import').setEnabled(
						enabled || Graph.fileSupport);
				// this.actions.get('save').setEnabled(enabled);
				this.actions.get('saveAs').setEnabled(enabled);
				this.actions.get('export').setEnabled(enabled);
			}));
		}*/
	};

	// Adds required resources (disables loading of fallback properties, this
	// can only
	// be used if we know that all keys are defined in the language specific
	// file)
	mxResources.loadDefaultBundle = false;
	var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage)
			|| mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

	var floor = urlParams['floor'];
	if (floor) {
		// Fixes possible asynchronous requests
		mxUtils
		.getAll(
				[ bundle, STYLE_PATH + '/default.xml' ],
				function(xhr) {
					// Adds bundle text to resources
					mxResources.parse(xhr[0].getText());

					// Configures the default graph theme
					var themes = new Object();
					themes[Graph.prototype.defaultThemeName] = xhr[1]
							.getDocumentElement();

					// Main
					var ui = new EditorUi(new Editor(urlParams['chrome'] == '0',
							themes));
					fetch(OPEN_URL + '/' + floor, {"method": "get", "headers": {"Authorization": window.authorization}}).then(function(res) {
						if(res.ok) {
							return res.text();
						} else {
							mxUtils.error(mxResources.get("foolPlanNotFound"), 200, true);
						}
					}).then(function(data) {
						var doc = mxUtils.parseXml(data);
						ui.editor.setGraphXml(doc.documentElement);
						ui.editor.setModified(false);
						ui.editor.undoManager.clear();
					}).catch(e => {
					});
				},
				function() {
					document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
				});
		
	} else {
		// Fixes possible asynchronous requests
		mxUtils
		.getAll(
				[ bundle, STYLE_PATH + '/default.xml' ],
				function(xhr) {
					// Adds bundle text to resources
					mxResources.parse(xhr[0].getText());

					// Configures the default graph theme
					var themes = new Object();
					themes[Graph.prototype.defaultThemeName] = xhr[1]
							.getDocumentElement();

					// Main
					new EditorUi(new Editor(urlParams['chrome'] == '0',
							themes));
				},
				function() {
					document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
				});
	}
	
})();