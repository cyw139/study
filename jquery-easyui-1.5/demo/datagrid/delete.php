<?php
/**
 *
 * @author        sAm(75424121@qq.com | tm166188 | rq)
 * @copyright (c) 2005 - 2015 NetDragon WebSoft Inc. All Rights Reserved.
 * @version       $Id$
 */
require_once './config.php';
$ids = $_POST['ids'];
$flag=$db->query("DELETE FROM `user` WHERE id IN({$ids})");
echo  $db->affected_rows;
$db->close();
