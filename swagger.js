export default {
    swagger: "2.0",
    info: {
        version: "1.0.0",
        title: "IG Store API",
        description: "An API for an social store"
    },
    schemes: ["https"],
    host: "http://ig-store.herokuapp.com",
    basePath: "/api/v1/",
    tags: [
        {
            name: "Auth",
            description: "Authenticate a user"
        },
        {
            name: "Store",
            description: "Creating Stores"
        }
    ],
    paths: {
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login the API to get authentication token",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "email",
                        in: "formData",
                        description: "The email for login",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "password",
                        in: "formData",
                        description: "The password for login in clear text",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Returns an authentication token on success.",
                responses: {
                    "200": {
                        description:
                            "Authentication Successful, return user details and token"
                    },
                    "400": {
                        description: "Wrong Password and Email Combination"
                    }
                }
            }
        },
        "/auth/signup": {
            post: {
                tags: ["Auth"],
                summary: "Create an account for a new user on the API",
                description: "Returns success 201 on success.",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "firstname",
                        in: "formData",
                        description:
                            "The firstname of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "lastname",
                        in: "formData",
                        description:
                            "The lastname for the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "gender",
                        in: "formData",
                        description:
                            "The gender for the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "date_of_birth",
                        in: "formData",
                        description:
                            "The date_of_birth of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "phone_mumber",
                        in: "formData",
                        description:
                            "The phone_number of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "image_url",
                        in: "formData",
                        description:
                            "The image_url for the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "password",
                        in: "formData",
                        description:
                            "The password for the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "oauth_type",
                        in: "formData",
                        description:
                            "The oauth_type of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "oauth_id",
                        in: "formData",
                        description:
                            "The oauth_id of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "state_code",
                        in: "formData",
                        description:
                            "The state_code for the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "county_code",
                        in: "formData",
                        description:
                            "The country_code for the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "city_code",
                        in: "formData",
                        description:
                            "The city_code of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "address",
                        in: "formData",
                        description:
                            "The address of the user account to be created",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "email",
                        in: "formData",
                        description:
                            "The email for the user account to be created",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "201": {
                        description: "New User created successfully",
                        schema: {
                            $ref: "#/definitions/User"
                        }
                    },
                    "400": {
                        description: "User Already Exists"
                    },
                    "500": {
                        description: "Error Saving User"
                    }
                }
            }
        },
        "/auth/changepassword": {
            post: {
                tags: ["Auth"],
                summary: "Change password on forgot password",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "email",
                        in: "formData",
                        description: "The email used on signup",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Sends a Mail to User.",
                responses: {
                    "200": {
                        description: "Please Check Mail to Change Password"
                    },
                    "400": {
                        description: "Error Sending Mail To Change Password"
                    }
                }
            }
        },
        "/auth/email/verify/:id": {
            get: {
                tags: ["Auth"],
                summary: "Verify Token Sent with Email",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Verify Token Sent with Email ",
                responses: {
                    "200": {
                        description:
                            "Token Verification Successful, Please Change Password"
                    },
                    "400": {
                        description: "Token Verification Failed"
                    }
                }
            }
        },
        "/auth/email/changepassword": {
            post: {
                tags: ["Auth"],
                summary: "Actual Change of Password",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "newpassword",
                        in: "formData",
                        description: "The newpassword to be changed",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "token",
                        in: "formData",
                        description: "The verified token",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Actual Change of Password",
                responses: {
                    "200": {
                        description: "Password Updated Successfully"
                    },
                    "400": {
                        description: "There Was an Error Changing Password"
                    }
                }
            }
        },
        "/auth/google": {
            get: {
                tags: ["Auth"],
                summary: "Login using Google OAUTH",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    }
                ]
            }
        },
        "/auth/facebook": {
            get: {
                tags: ["Auth"],
                summary: "Login using Facebook OAUTH",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    }
                ]
            }
        },
        "/store/:id ": {
            get: {
                tags: ["Store"],
                summary: "Get store by id",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Get a store by store id ",
                responses: {
                    "200": {
                        description: "Successfully fetched store"
                    },
                    "400": {
                        description: "Error fetching store"
                    }
                }
            }
        },
        "/store/all ": {
            get: {
                tags: ["Store"],
                summary: "Get all stores created by user",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Get all stores created by user",
                responses: {
                    "200": {
                        description:
                            "Successfully fetched all stores created by user"
                    },
                    "400": {
                        description: "Error fetching store"
                    }
                }
            }
        },
        "/store": {
            post: {
                tags: ["Store"],
                summary: "Create a new store",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "name",
                        in: "formData",
                        description: "name of the store",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "picture_url",
                        in: "formData",
                        description: "The picture url of the store",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "address",
                        in: "formData",
                        description: "Address of store",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "city_code",
                        in: "formData",
                        description: "store city code",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "state_code",
                        in: "formData",
                        description: "store state code",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "country_code",
                        in: "formData",
                        description: "store country code",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "description",
                        in: "formData",
                        description: "store description",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Saves new store",
                responses: {
                    "200": {
                        description: "New Store created successfully"
                    },
                    "400": {
                        description: "Could not save store"
                    }
                }
            }
        },
        "/store/:id": {
            put: {
                tags: ["Store"],
                summary: "Update Store by id",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "name",
                        in: "formData",
                        description: "name of the store",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "picture_url",
                        in: "formData",
                        description: "The picture url of the store",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "address",
                        in: "formData",
                        description: "Address of store",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "city_code",
                        in: "formData",
                        description: "store city code",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "state_code",
                        in: "formData",
                        description: "store state code",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "country_code",
                        in: "formData",
                        description: "store country code",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "description",
                        in: "formData",
                        description: "store description",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Updating store by id",
                responses: {
                    "200": {
                        description: "Store updated successfully"
                    },
                    "400": {
                        description: "Could not update store"
                    }
                }
            }
        },
        "/store/:id   ": {
            delete: {
                tags: ["Store"],
                summary: "Delete Store by id",
                consumes: ["application/x-www-form-urlencoded"],
                parameters: [
                    {
                        name: "x-access-token",
                        in: "header",
                        description: "Authorization token",
                        required: true,
                        type: "string"
                    }
                ],
                description: "Delete Store by id",
                responses: {
                    "200": {
                        description: "Successfully deleted store"
                    },
                    "400": {
                        description: "Error deleting store"
                    }
                }
            }
        }
    }
};

// ,
//     definitions: {
//         User: {
//             type: "object",
//             properties: {
//                 name: {
//                     type: "string"
//                 },
//                 email: {
//                     type: "string"
//                 },
//                 password: {
//                     type: "string"
//                 },
//                 fullname: {
//                     type: "string"
//                 }
//             }
//         }
//     }
