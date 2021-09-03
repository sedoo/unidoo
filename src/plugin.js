// Import vue components
// import * as components from './components/index'
// var components = {}

// install function executed by Vue.use()
function install(Vue) {
    if (install.installed) return
    install.installed = true

    // For each matching file name...
    requireComponent.keys().forEach((fileName) => {
            // Get the component config
            const componentConfig = requireComponent(fileName)
                // Get the PascalCase version of the component name
            const componentName = fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
                // components[componentName] = componentConfig.default || componentConfig
                // Globally register the component
            Vue.component(componentName, componentConfig.default || componentConfig)
        })
        // Register Global event to show AppMessage, related to AppSnackbar
        // https://medium.com/@panzelva/writing-modals-for-vue-js-callable-from-anywhere-6994d180451
    this.EventBus = new Vue()
    Vue.prototype.$unidooAlert = {
        show(params) {
            plugin.EventBus.$emit("unidoo-alert-show", params)
        },

        defaultParams(params) {
            plugin.EventBus.$emit("unidoo-alert-params", params)
        },

        showSuccess(message, closeButtonLabel) {
            if (closeButtonLabel) {
                this.showMessage(message, "success", 4000, 'top', closeButtonLabel)
            } else {
                this.showMessage(message, "success")
            }
        },

        /**
         * Display the given error message for 8 seconds
         * @param {string} message 
         */
        showError(message, closeButtonLabel) {
            if (closeButtonLabel) {
                this.showMessage(message, "error", 8000, 'top', closeButtonLabel)
            } else {
                this.showMessage(message, "error", 8000)
            }
        },

        /**
         * This method return the message from an error object ResponseStatusException or RuntimeException
         * @param {string} prefix e.g. 'An error has occured :'
         * @param {*} error The error object from the catch(function(error)
         * @returns {string} The error message
         */
        formatError(prefix, error) {
            let message = 'An error has occured'
            if (typeof error === 'object') {
                if (error.response && error.response.data && error.response.data.message) {
                    message = prefix + ' ' + error.response.data.message
                } else if (error.message) {
                    message = prefix + ' ' + error.message
                }
            }
            return message
        },

        showMessage(message, type, timeout, position, closeButtonLabel) {
            const params = {}
            if (position) {
                params.position = position
            }

            if (timeout) {
                params.timeout = timeout
            }

            if (closeButtonLabel) {
                params.closeButtonLabel = closeButtonLabel
            }

            params.message = message
            params.type = type
            this.show(params)
        },
    }

    Vue.prototype.$unidooUuid = {
        randomUuidV4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0;
                var v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
    }

    Vue.prototype.$unidooConfirmDialog = {
        showWithParams(params) {
            plugin.EventBus.$emit("unidoo-confirm-dialog-show", params)
        },

        defaultParams(params) {
            plugin.EventBus.$emit("unidoo-confirm-dialog-params", params)
        },

        show(callback, message, title) {
            const params = {}
            if (callback) {
                params.callback = callback
            }

            if (message) {
                params.message = message
            }

            if (title) {
                params.title = title
            }

            this.showWithParams(params)
        },
    }

    Vue.prototype.$unidooCrudTable = {
        show(params) {
            plugin.EventBus.$emit("unidoo-crud-show", params)
        },
    }
}

// Create module definition for Vue.use()
const plugin = {
    install
}

// To auto-install when vue is found

let GlobalVue = null
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
}
if (GlobalVue) {
    GlobalVue.use(plugin)
}

const requireComponent = require.context(
    // Look for files in the current directory
    './components',
    // Look in subdirectories
    true,
    // Only include "_base-" prefixed .vue files
    /[\w-]+\.vue$/
)

// Default export is library as a whole, registered via Vue.use()
export default plugin

// To allow individual component use, export components
// each can be registered via Vue.component()
// console.log({components})
// export {components}