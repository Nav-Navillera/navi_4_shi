app_name = "navi_for_shi"
app_title = "Navi for SHI"
app_publisher = "Navi"
app_description = "Custom ERP for SHI from Navi"
app_email = "aderifalfauzi@gmail.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/navi_for_shi/css/navi_for_shi.css"
# app_include_js = "/assets/navi_for_shi/js/navi_for_shi.js"

# include js, css files in header of web template
# web_include_css = "/assets/navi_for_shi/css/navi_for_shi.css"
# web_include_js = "/assets/navi_for_shi/js/navi_for_shi.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "navi_for_shi/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

doctype_js = {
    "Sales Pipeline Control" : ["public/js/d3.v7.min.js", "public/js/d3-sankey.min.js"]
}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}


# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "navi_for_shi/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "navi_for_shi.utils.jinja_methods",
# 	"filters": "navi_for_shi.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "navi_for_shi.install.before_install"
# after_install = "navi_for_shi.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "navi_for_shi.uninstall.before_uninstall"
# after_uninstall = "navi_for_shi.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "navi_for_shi.utils.before_app_install"
# after_app_install = "navi_for_shi.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "navi_for_shi.utils.before_app_uninstall"
# after_app_uninstall = "navi_for_shi.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "navi_for_shi.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"navi_for_shi.tasks.all"
# 	],
# 	"daily": [
# 		"navi_for_shi.tasks.daily"
# 	],
# 	"hourly": [
# 		"navi_for_shi.tasks.hourly"
# 	],
# 	"weekly": [
# 		"navi_for_shi.tasks.weekly"
# 	],
# 	"monthly": [
# 		"navi_for_shi.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "navi_for_shi.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "navi_for_shi.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "navi_for_shi.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["navi_for_shi.utils.before_request"]
# after_request = ["navi_for_shi.utils.after_request"]

# Job Events
# ----------
# before_job = ["navi_for_shi.utils.before_job"]
# after_job = ["navi_for_shi.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"navi_for_shi.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

