<%-- 
    Document   : login
    Created on : 05 Mar 2014, 11:37:33 AM
    Author     : Pierre.Venter
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//Dtd HTML 4.0 Final//EN">
<head>
    <title>Login Page</title>
    <%
        session.setAttribute("theLogin", "");
        session.setAttribute("isAdmin", "false");
        session.setAttribute("level", "-1");
    %>
    <link rel="stylesheet" href="css/dataTable.css" media="screen">

</head>
<body>

<center>
    <br>
    <form action="index.jsp" method="post"><br>
        <table class='blingBackGroundTable' cellspacing='0' border="0">
            <tr bgcolor="#000000">
                <td bgcolor="#000000" class="logoImg" style="border: 0px" colspan="2">
                    <br><br>
                    <img src='images/CNetTRANSLOGO.png' width="400" height="185" style="padding-left: 5px"/>
                </td>
                <td></td>
            </tr>
            <tr></tr>
            <td>
            <tr>
                <td style="text-align: left">
                    Name : &nbsp;
                </td>
                <td style="text-align: center">
                    <input name="loginname" type="text" style="text-align: left;width: 350px"/><br>
                </td>
            </tr>
            <tr>
                <td>
                    Password : &nbsp;
                </td>
                <td style="text-align: center">
                    <input name="loginpassword" type="password" style="text-align: left;width: 350px"/><br>
                </td>
            </tr>
            <tr>
                <td style="text-align: center" colspan="2">
                    <input type="submit" value="Submit" name="B1" style="text-align: center">
                </td>
            </tr>
            <tr style="border: 1px #000000">
                <td colspan="2">
                </td>
            </tr>
        </table>
    </form>

</center>
</body>
</html>
