package com.epam.pet.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.epam.pet.model.user.UserRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import static com.epam.pet.security.SecurityConstants.EXPIRATION_TIME;
import static com.epam.pet.security.SecurityConstants.SECRET;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    @Autowired
    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl("/login");
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest req,
            HttpServletResponse res) throws AuthenticationException {
        try {
            UserRequest credits = new ObjectMapper().readValue(req.getInputStream(), UserRequest.class);
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credits.getUserName(),
                            credits.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain,
            Authentication auth) throws IOException {

        String token = JWT.create()
                .withSubject(((User) auth.getPrincipal()).getUsername())
                .withExpiresAt(getExpirationDate())
                .sign(Algorithm.HMAC512(SECRET.getBytes()));
        String body = "{\"token\": \"" + token + "\"}";

        res.getWriter().write(body);
        res.getWriter().flush();
    }

    private Date getExpirationDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR_OF_DAY, EXPIRATION_TIME);
        return calendar.getTime();
    }
}

