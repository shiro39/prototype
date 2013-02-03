<?php
session_start();
$arr = array('status' => "error:unknown error");
if(session_is_registered('uid')){
	session_destroy();
	$arr = array('status' => "done:logout success");
}else{
	$arr = array('status' => "error:logout error");
}
echo json_encode($arr);

?>