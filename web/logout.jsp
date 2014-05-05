<%-- 
    Document   : logout
    Created on : 05 Mar 2014, 12:39:21 PM
    Author     : Pierre.Venter
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="scripts/Index_Functions.js"></script>
        <%
            session.setAttribute("login", "");
            session.setAttribute("level", "");
            session.setAttribute("loginpassword", "");
            session.setAttribute("loginname", "");;
            session.setAttribute("isAdmin", "false");
            session.setAttribute("level", "-1");
        %>
    </head>
    <body>
        <script>

            sessionLogout();

        </script>
        <jsp:forward page="login.jsp" />
    </body>
</html>
