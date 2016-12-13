<?php
/**
 *
 * @author        sAm(75424121@qq.com | tm166188 | rq)
 * @copyright (c) 2005 - 2015 NetDragon WebSoft Inc. All Rights Reserved.
 * @version       $Id$
 */
error_reporting(E_ALL);
$db = mysqli_connect('127.0.0.1','root','dbpasswd',"easyui");
if($db->connect_errno){
	printf('Connect failed: %s\n',$db->connect_error);
	die();
}
$db->set_charset('utf8');