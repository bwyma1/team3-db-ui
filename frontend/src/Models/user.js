export class user {
    constructor(email, user_name, password, security_question, security_question_answer, user_id, bio, location, phone_number, profile_picture) {
        this.user_id = user_id
        this.email = email;
        this.user_name = user_name;
        this.password = password;
        this.security_question = security_question;
        this.security_question_answer = security_question_answer;
        this.bio = bio;
        this.location = location;
        this.phone_number = phone_number;
        this.profile_picture = profile_picture;
    }
};