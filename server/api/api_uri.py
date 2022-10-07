from api.admin_validation_api import AdminValidationApi
from api.testimonial_display_api import DisplayTestimonialsApi
from api.testimonial_verification_api import VerifyTestimonialsApi
from api.user_testimonial_api import *
from api.admin_api import *
from api.user_details_api import *
from api.user_validation_api import UserValidationApi
from api.user_authentication import Login
from extensions.api import api


api.add_resource(UserApi,"/api/user/getUserDetails","/api/user/delete","/api/register/userDetails")
api.add_resource(TestimonialApi,"/api/addUserTestimonial","/api/get/userDashboard")
api.add_resource(DisplayTestimonialsApi, "/api/getApprovedTestimonials")
api.add_resource(UserValidationApi, "/api/userValidation")
api.add_resource(AdminValidationApi, "/api/adminValidation")
api.add_resource(VerifyTestimonialsApi, "/api/admin/getPendingTestimonials", "/api/updateTestimonialValidationStatus")
api.add_resource(Login, "/api/login")
