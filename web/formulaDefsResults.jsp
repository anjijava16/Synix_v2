<%-- 
    Document   : formulaDefsResults
    Created on : 15 May 2014, 9:33:11 AM
    Author     : NMichael
--%>
<%@page import="za.co.cellc.synix.model.FormulaDefManager"%>
<%
    
        String theIsAdmin = (String) session.getAttribute("isAdmin");
    
        String operationRequired     =(String) request.getParameter("operationRequired"    );    
        String vendor                =(String) request.getParameter("vendor"               );
        String technology            =(String) request.getParameter("technology"           );
        String chartTitle            =(String) request.getParameter("chartTitle"           );
        String formula               =(String) request.getParameter("formula"              );
        String algorythm             =(String) request.getParameter("algorythm"            );
        String priority              =(String) request.getParameter("priority"             );
        String target                =(String) request.getParameter("target"               );
        String flatTableName         =(String) request.getParameter("flatTableName"        );
        String isEnabled             =(String) request.getParameter("isEnabled"            );
        String viewCellHourly        =(String) request.getParameter("viewCellHourly"       );
        String viewCellDaily         =(String) request.getParameter("viewCellDaily"        );
        String viewControlle_Hourly  =(String) request.getParameter("viewControlle_Hourly" );
        String viewControllerDaily   =(String) request.getParameter("viewControllerDaily"  );
        String viewCellWeekly        =(String) request.getParameter("viewCellWeekly"       );
        String viewCellMonthly       =(String) request.getParameter("viewCellMonthly"      );
        String viewControllerWeekly  =(String) request.getParameter("viewControllerWeekly" );
        String viewControllerMonthly =(String) request.getParameter("viewControllerMonthly");
        String query="";
        
        String whereClause=" WHERE VENDOR='"+vendor+"' AND  TECHNOLOGY='"+technology+"' AND CHART_TITLE='"+chartTitle+"'";


        
        String result="Query not run";
        String insertQuery="INSERT INTO FORMULA_DEFS"
            +"(VENDOR,TECHNOLOGY,CHART_TITLE,FORMULA,ALGORYTHM,"
                + "PRIORITY,TARGET,FLAT_TABLE_NAME,IS_ENABLED,"
                + "VIEW_CELL_HOURLY,VIEW_CELL_DAILY,VIEW_CONTROLLER_HOURLY,"
                + "VIEW_CONTROLLER_DAILY,VIEW_CELL_WEEKLY,VIEW_CELL_MONTHLY,"
                + "VIEW_CONTROLLER_WEEKLY,VIEW_CONTROLLER_MONTHLY)"
                
            +" VALUES"
            +"("
            +" '"+vendor               +"',"
            +"'"+technology           +"',"
            +"'"+chartTitle           +"',"
            +"'"+formula              +"',"
            +"'"+algorythm            +"',"
            +"'"+priority             +"',"
            +"'"+target               +"',"
            +"'"+flatTableName        +"',"
            +"'"+isEnabled            +"',"
            +"'"+viewCellHourly       +"',"
            +"'"+viewCellDaily        +"',"
            +"'"+viewControlle_Hourly +"',"
            +"'"+viewControllerDaily  +"',"
            +"'"+viewCellWeekly       +"',"
            +"'"+viewCellMonthly      +"',"
            +"'"+viewControllerWeekly +"',"
            +"'"+viewControllerMonthly+"' "
            +")";
        
        String updateQuery="UPDATE FORMULA_DEFS SET"
            +" VENDOR = '"+vendor               +"'"
            +", TECHNOLOGY = '"+technology           +"'"
            +", CHART_TITLE = '"+chartTitle           +"'"
            +", FORMULA = '"+formula              +"'"
            +", ALGORYTHM = '"+algorythm            +"'"
            +", PRIORITY = '"+priority             +"'"
            +", TARGET = '"+target               +"'"
            +", FLAT_TABLE_NAME = '"+flatTableName        +"'"
            +", IS_ENABLED = '"+isEnabled            +"'"
            +", VIEW_CELL_HOURLY = '"+viewCellHourly       +"'"
            +", VIEW_CELL_DAILY = '"+viewCellDaily        +"'"
            +", VIEW_CONTROLLER_HOURLY = '"+viewControlle_Hourly +"'"
            +", VIEW_CONTROLLER_DAILY = '"+viewControllerDaily  +"'"
            +", VIEW_CELL_WEEKLY = '"+viewCellWeekly       +"'"
            +", VIEW_CELL_MONTHLY = '"+viewCellMonthly      +"'"
            +", VIEW_CONTROLLER_WEEKLY = '"+viewControllerWeekly +"'"
            +", VIEW_CONTROLLER_MONTHLY= '"+viewControllerMonthly+"'"
            +whereClause;
        
        
        
        if(operationRequired!=null && operationRequired.equalsIgnoreCase("INSERT")){
            query=insertQuery;    
        } else if(operationRequired!=null && operationRequired.equalsIgnoreCase("UPDATE")){
            query=updateQuery;    
        }
        
        if(theIsAdmin!=null && theIsAdmin.equalsIgnoreCase("TRUE")){
            try{
            FormulaDefManager formulaDef = new FormulaDefManager(false, query);            
            formulaDef.runInsertUpdateQuery();
            result="Query ran successfully";
            }catch(Exception ex){
                result="Failed to execute query ; "+ ex.getMessage()+" "+ex.getStackTrace();
            }
            
        }



%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>FORMULA_DEFS Operation Results</title>
    </head>
    <body> 
<br>
<br> 
<% 
        if(theIsAdmin!=null && theIsAdmin.equalsIgnoreCase("TRUE")){
%>  
<br>
<br>
        Results of operation :<br>
        <%=result %><br><br>
        Query :<br>
        <%=query %><br><br>
        
  <a href="formuladefs.jsp" >Insert/Update another record to FORMULA_DEFS table</a>
<% 
        }
%>        
 <a href="index.jsp" >Home Page</a>       
    </body>
</html>
