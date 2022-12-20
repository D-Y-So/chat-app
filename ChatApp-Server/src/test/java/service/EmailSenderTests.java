package service;

import chatApp.entities.Response;
import chatApp.service.EmailSender;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class EmailSenderTests {

    @Test
    public void sendEmail_validEmailAddress_returnsSuccessfulResponse(){
        Response<String> response = EmailSender.sendMail("subject","message","chat.app3000@gmail.com");
        assertTrue(response.isSucceed(), "Email address format is valid but email couldn't be sent.");
    }

    @Test
    public void sendEmail_invalidEmailAddressFormat_returnsFailureResponse(){
        Response<String> response = EmailSender.sendMail("subject","message","gjfyjgfy");
        assertFalse(response.isSucceed(), "Email address format is invalid, but method didn't return failure response.");
    }

    @Test
    public void sendEmail_emailAddressNull_returnsFailureResponse(){
        Response<String> response = EmailSender.sendMail("subject","message",null);
        assertFalse(response.isSucceed(), "Email address is null, but method didn't return failure response");
    }

    @Test
    public void sendEmail_emailAddressEmpty_returnsFailureResponse(){
        Response<String> response = EmailSender.sendMail("subject","message","");
        assertFalse(response.isSucceed(), "Email address is empty, but method didn't return failure response");
    }

    @Test
    public void sendEmail_bodyNull_returnsFailureResponse(){
        Response<String> response = EmailSender.sendMail("subject",null,"chat.app3000@gmail.com");
        assertFalse(response.isSucceed(), "Email body is null, but method didn't return failure response");
    }

}
