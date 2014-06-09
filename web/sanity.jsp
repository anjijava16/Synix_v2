<%-- 
    Document   : sanity
    Created on : 09 Jun 2014, 2:09:13 PM
    Author     : NMichael
--%>

<%
//   String sanityUrl="http://10.220.8.217:8080/SynixSanity-0.1/dbMonitor/index";
   String sanityUrl=za.co.cellc.synix.constants.Constants.SANITY_URL;
%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<HTML>
<HEAD>
<TITLE>Synix Sanity</TITLE>
</HEAD>
<FRAMESET ROWS="*,0">
<FRAME SRC="<%=sanityUrl %>" NORESIZE>
<NOFRAMES>
Your browser does not support frames.
</NOFRAMES>
</FRAMESET>
</HTML>