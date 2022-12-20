package controller;

import chatApp.controller.UserController;
import chatApp.service.PermissionService;
import chatApp.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UserControllerTestsMock {

    @Mock
    private UserService userService;
    @Mock
    private PermissionService permissionService;
    @InjectMocks
    private UserController userController;

    @Test
    void getUserName_userExists_returnsStatus200(){
        //given()
    }



}
