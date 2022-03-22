/*
 * View model for BookmarkManager
 *
 * Author: OllisGit
 * License: AGPLv3
 */
$(function() {

    function BookmarkManagerViewModel(parameters) {

        let PLUGIN_ID = "BookmarkManager"; // from setup.py plugin_identifier

        let self = this;

        // assign the injected parameters, e.g.:
        // self.loginStateViewModel = parameters[0];
        self.settingsViewModel = parameters[0];

        self.pluginSettings = null;

        // Helper for conditional attr - values
        ko.bindingHandlers.attrIf = {
            update: function (element, valueAccessor, allBindingsAccessor) {
                var h = ko.utils.unwrapObservable(valueAccessor());
                var show = ko.utils.unwrapObservable(h._if);
                if (show) {
                    ko.bindingHandlers.attr.update(element, valueAccessor, allBindingsAccessor);
                } else {
                    for (var k in h) {
                        if (h.hasOwnProperty(k) && k.indexOf("_") !== 0) {
                            $(element).removeAttr(k);
                        }
                    }
                }
            }
        };


        //////////////////////////////////////////////////////////////////////////////////////////////// KNOCKOUT MODLES
        self.addBookmark = function(){
            self.pluginSettings.allBookmarks.push({
                name: ko.observable( "New" ),
                url: ko.observable( "https://" ),
                showInNewTab: ko.observable()
            });
        }
        self.removeBookmark = function(bookmark){
            self.pluginSettings.allBookmarks.remove(bookmark);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////// OCTOPRINT HOOKS
        self.onBeforeBinding = function() {
            // assign current pluginSettings
            self.pluginSettings = self.settingsViewModel.settings.plugins[PLUGIN_ID];
        }
    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: BookmarkManagerViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: [
            "settingsViewModel"
        ],
        // Elements to bind to, e.g. #settings_plugin_BookmarkManager, #tab_plugin_BookmarkManager, ...
        elements: [
            document.getElementById("settings_bookmarkmanager"),
            document.getElementById("navbar_bookmarkmanager")
        ]
    });
});
