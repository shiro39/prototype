<?php
	session_start();
	header("Access-Control-Allow-Origin: *"); 
	include 'connectDB.php';


	$arr = array('status' => "error:unknown error");
	if($_DB_CONNECT_STATUS){
		$username=addslashes($_POST["u"]);
		$password=addslashes($_POST["p"]);
		if($username!="" && $password!=""){
			$result=mysql_query("SELECT uid from ACCOUNT where username='".$username."' and password='".$password."'");
			if($result){
				if(mysql_num_rows($result)==1){
					$arr = array('status' => "done:authenticated username and password");
					$_SESSION['uid']= mysql_result($result, 0);
				}else{
					$arr = array('status' => "error:unauthenticated username and password");
				}
			}else{
				$arr = array('status' => "error:login select data error");
			}
		}else{
			$arr = array('status' => "error:can't found post data(username and password)");
		}
		mysql_close($link);
		
		
	}else{
		$arr = array('status' => "error:database connect error");
	}
	echo json_encode($arr);
?>