<?php
/**
 *
 * @author        sAm(75424121@qq.com | tm166188 | rq)
 * @copyright (c) 2005 - 2015 NetDragon WebSoft Inc. All Rights Reserved.
 * @version       $Id$
 */
require_once './config.php';
$rows = isset($_REQUEST['rows']) ? (int)$_REQUEST['rows'] : 3;
$page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
$start = $rows * ($page-1);
$q=isset($_REQUEST['q'])? trim($_REQUEST['q']) : '';
$order=isset($_REQUEST['order']) && $_REQUEST['order'] ? explode(',',$_REQUEST['order']) : '';
$sorts=isset($_REQUEST['sort']) && $_REQUEST['sort'] ? explode(',',$_REQUEST['sort']) : '';
$sort='';
if($sorts){
	foreach ($sorts as $_k=>$_sort ) {
		$sep=($_k>0) ? ', ' : '';
		$sort .= $sep.$_sort.' '.(isset($order[$_k]) ? $order[$_k] : '');
	}
	$sort = 'ORDER BY '.$sort;
}


$where=' where 1=1 ';
if($q){
	$where .="AND productname LIKE '%{$q}%'";
}
$sql="SELECT * FROM `user` {$where} {$sort} LIMIT {$start},{$rows}";
//echo $sql;die;
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

