# Copyright (c) 2025, Navi and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class SalesPipelineControl(Document):
	def before_save(self):
	#self.state_update()
		pass

	def state_update(self):
		# Update status dokumen

		cbd_state = self.cbd_id 
		sq_init_state = self.sq_init_id
		po_state = self.po_number
		so_state = self.sales_order_id

		if cbd_state:
			self.status = "CBD Release"
		elif sq_init_state:
			self.status = "SQ Proposed"
		elif po_state:
			self.status = "PO Release"
		elif so_state:
			self.status = "SO Release"
		else:
			self.status = "None"


	
