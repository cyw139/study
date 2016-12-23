<?php
/**
 *
 * @author        sAm(75424121@qq.com | tm166188 | rq)
 * @copyright (c) 2005 - 2015 NetDragon WebSoft Inc. All Rights Reserved.
 * @version       $Id$
 */
require_once './config.php';
$rows = isset($_POST['rows']) ? (int)$_POST['rows'] : 3;
$page = isset($_POST['page']) ? $_POST['page'] : 1;
$start = $rows * ($page-1);
$q=isset($_POST['q'])? trim($_POST['q']) : '';
$where=' where 1=1 ';
if($q){
	$where .="AND productname LIKE '%{$q}%'";
}
$sql="SELECT * FROM `user` {$where} LIMIT {$start},{$rows}";
$sql_total = "SELECT * FROM `user` {$where}";
$result = $db->query($sql);
$total = $db->query($sql_total);
$rows = array();
if($result){
	while($row = $result->fetch_assoc()){
		$rows[]=$row;
	}
	$result->close();
//	$db->next_result();
}
$db->close();
$data['rows']=$rows;
$data['total']=$total->num_rows;
echo json_encode($data);

