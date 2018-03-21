package com.candyland.resource;

import com.candyland.config.SecurityConfig;
import com.candyland.config.SecurityUtility;
import com.candyland.domain.User;
import com.candyland.domain.security.Role;
import com.candyland.domain.security.UserRole;
import com.candyland.service.UserService;
import com.candyland.utility.MailConstructor;

import java.security.Principal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserResource {

    @Autowired
    private UserService userService;

    @Autowired
    private MailConstructor mailConstructor;

    @Autowired
    private JavaMailSender mailSender;


    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public User addUserPost(@RequestBody User user) {
        return userService.save(user);
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public ResponseEntity remove(
        @RequestBody String id
    ) {
        userService.removeOne(Long.parseLong(id));

        return new ResponseEntity("Remove Success!", HttpStatus.OK);
    }

    @RequestMapping("/{id}")
    public User getUser(@PathVariable("id") Long id) {
        User user = userService.findOne(id);
        return user;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public User updateUserPost(@RequestBody User user) {
        return userService.save(user);
    }

    @RequestMapping(value = "/newUser", method = RequestMethod.POST)
    public ResponseEntity newUserPost(
        HttpServletRequest request,
        @RequestBody HashMap<String, String> mapper
    ) throws Exception {
        String username = mapper.get("username");
        String userEmail = mapper.get("email");

        if (userService.findByUsername(username) != null) {
            return new ResponseEntity("usernameExists", HttpStatus.BAD_REQUEST);
        }

        if (userService.findByEmail(userEmail) != null) {
            return new ResponseEntity("emailExists", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(userEmail);

        String password = SecurityUtility.randomPassword();

        String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
        user.setPassword(encryptedPassword);
        user.setRole(1);

        Role role = new Role();
        role.setRoleId(1);
        role.setName("ROLE_USER");
        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(new UserRole(user, role));
        userService.createUser(user, userRoles);

        SimpleMailMessage email = mailConstructor.constructNewUserEmail(user, password);
        mailSender.send(email);

        return new ResponseEntity("User Added Successfully!", HttpStatus.OK);
    }

    @RequestMapping(value = "/forgetPassword", method = RequestMethod.POST)
    public ResponseEntity forgetPasswordPost(
        HttpServletRequest request,
        @RequestBody HashMap<String, String> mapper
    ) throws Exception {
        User user = userService.findByEmail(mapper.get("email"));

        if (user == null) {
            return new ResponseEntity("Email not found", HttpStatus.BAD_REQUEST);
        }

        String password = SecurityUtility.randomPassword();

        String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
        user.setPassword(encryptedPassword);
        userService.save(user);

        SimpleMailMessage newEmail = mailConstructor.constructNewUserEmail(user, password);
        mailSender.send(newEmail);

        return new ResponseEntity("Email sent!", HttpStatus.OK);
    }

    @RequestMapping(value = "/updateUserInfo", method = RequestMethod.POST)
    public ResponseEntity profileInfo(
        @RequestBody HashMap<String, Object> mapper
    ) throws Exception {

        int id = (Integer) mapper.get("id");
        String email = (String) mapper.get("email");
        Double points = 1.0 * ((Integer) mapper.get("walletPoints"));
        int bonusPoints = -2;
        String username = (String) mapper.get("username");
        String firstName = (String) mapper.get("firstName");
        String lastName = (String) mapper.get("lastName");
        String newPassword = (String) mapper.get("newPassword");
        String currentPassword = (String) mapper.get("currentPassword");

        User currentUser = userService.findById(Long.valueOf(id));

        if (currentUser == null) {
            throw new Exception("User not found");
        }

        if (userService.findByEmail(email) != null) {
            if (userService.findByEmail(email).getId() != currentUser.getId()) {
                return new ResponseEntity("Email not found!", HttpStatus.BAD_REQUEST);
            }
        }

        if (userService.findByUsername(username) != null) {
            if (userService.findByUsername(username).getId() != currentUser.getId()) {
                return new ResponseEntity("Username not found!", HttpStatus.BAD_REQUEST);
            }
        }

        SecurityConfig securityConfig = new SecurityConfig();

        if (newPassword != null && !newPassword.isEmpty() && !newPassword.equals("")) {
            BCryptPasswordEncoder passwordEncoder = SecurityUtility.passwordEncoder();
            String dbPassword = currentUser.getPassword();

            if (passwordEncoder.matches(currentPassword, dbPassword)) {
                currentUser.setPassword(passwordEncoder.encode(newPassword));
            } else {
                return new ResponseEntity("Incorrect current password!", HttpStatus.BAD_REQUEST);
            }
        }

        currentUser.setFirstName(firstName);
        currentUser.setLastName(lastName);
        currentUser.setUsername(username);
        currentUser.setWalletPoints(points);
        currentUser.setBonusPoints(((int) (points / 100) * 10));
        currentUser.setEmail(email);
        System.out.println((int) ((points / 100) * 10));
        userService.save(currentUser);

        return new ResponseEntity("Update Success", HttpStatus.OK);
    }

    @RequestMapping("/getCurrentUser")
    public User getCurrentUser(Principal principal) {
        System.out.println("In JAVA getCurrentUser\n\n");
        User user = new User();
        if (null != principal) {
            System.out.println("In -> JAVA getCurrentUser\n\n");
            user = userService.findByUsername(principal.getName());
        }
        System.out.println(user.getUsername());
        return user;
    }
/*
    @RequestMapping("/getWalletPoints")
    public Double getWalletPoints(Principal principal) {
        User user = new User();
        if (null != principal) {
            user = userService.findByUsername(principal.getName());
        }
        return user.getWalletPoints();
    }*/

    @RequestMapping("/userList")
    public List<User> getUserList() {
        return userService.findAll();
    }

    @RequestMapping(value = "/updateWalletInfo", method = RequestMethod.POST)
    public ResponseEntity updateWalletInfo(
        @RequestBody HashMap<String, Object> mapper
    ) throws Exception {

        int id = (Integer) mapper.get("id");
        Double points = (Double) mapper.get("points");

        User currentUser = userService.findById(Long.valueOf(id));

        if (currentUser == null) {
            throw new Exception("User not found");
        }

        currentUser.setWalletPoints(points);

        userService.save(currentUser);

        return new ResponseEntity("Update Success", HttpStatus.OK);
    }

}
