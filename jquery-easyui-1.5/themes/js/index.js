$(function () {
  InitLeftMenu();

  $('#tabs').tabs({
    onContextMenu:function(e, title,index) {
      e.preventDefault();
      if(index > 0) {
        $('#mm').menu('show', {
          left : e.pageX,
          top  : e.pageY
        }).data("tabTitle", title);
      }
    }
  });

  //右键菜单click
  $("#mm").menu({
    onClick : function (item) {
      closeTabByMenu(this, item.id);
    }
  });

  $('body').layout();
});

function InitLeftMenu() {
  function getSubMenu(children) {
    var html = '<ul>';
    for(var i in children) {
      if (children.hasOwnProperty(i)) {
        html += '<li style="list-style-type:none">';
        html += '<a href="' + NnUI.host + '/' + children[i].name + '" target="_blank" style="float:right;display:inline-block;width:16px;height:16px;">';
        html += '<img src="' + NnUI.static + 'images/s.gif" class="icon icon-window-open" title="在新窗口中打开" />';
        html += '</a>';
        html += '<img src="' + NnUI.static + 'images/s.gif" class="icon icon-' + (children[i].icon||"default") + '" />';
        html += '<a class="open-url" icon="' + (children[i].icon||"default") + '" id="menu_id_' + children[i].id +'" href="' + NnUI.host + '/' + children[i].name + '">' + children[i].title + '</a>';
        html += '</li>';
      }
    }
    html += '</ul>';

    return html;
  }

  $.getJSON(
    '/Index/getMenu',
    function (data) {
      data = data.data;
      for(var i in data) {
        if (data.hasOwnProperty(i)) {
          $('#main-menu').accordion('add', {
            id       : 'menu_id_' + data[i].id,
            title    : data[i].title,
            content  : getSubMenu(data[i].children),
            selected : false,
            iconCls  : "icon icon-" + (data[i].icon||'default')
          });
        }
      }

      // 初始化accordion的列表
      setTimeout(function () {
        $('.easyui-accordion li .open-url').unbind('click').click(function (e) {
          e.preventDefault();

          addTab({
            title : $(this).text(),
            url   : $(this).attr('href'),
            id    : $(this).attr('id'),
            icon  : $(this).attr('icon')
          });
          $('.easyui-accordion li div').removeClass("selected");
          $(this).parent().addClass("selected");
        }).hover(function () {
          $(this).parent().addClass("hover");
        }, function () {
          $(this).parent().removeClass("hover");
        });
      }, 200);

      setTimeout(function () {
        $('#main-menu').accordion().select(0);
      }, 300);
    }
  );
}

function addTab(obj) {
  if (!$('#tabs').tabs('exists', obj.title)) {
    $('#tabs').tabs('add', {
      id      : 'tab_' + obj.id,
      title   : obj.title,
      iconCls : "icon icon-" + (obj.icon || 'default'),
      content : createFrame(obj.url),
      closable: true,
      width   : $('#mainPanle').width() - 10,
      height  : $('#mainPanle').height() - 26
    });
  } else {
    $('#tabs').tabs('select', obj.title);
  }
}

function closeTab(title) {
  $('#tabs').tabs('close', title);
}

function createFrame(url) {
  var s = '<iframe name="mainFrame" scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';

  return s;
}

function closeTabByMenu(menu, itemId) {
  var allTabs = $("#tabs").tabs('tabs');
  var allTabtitle = [];
  $.each(allTabs, function(i, n) {
    var opt=$(n).panel('options');
    if(opt.closable) {
      allTabtitle.push(opt.title);
    }
  });

  var curTabTitle = $(menu).data("tabTitle");
  var curTabIndex = $("#tabs").tabs("getTabIndex", $("#tabs").tabs("getTab", curTabTitle));

  switch (itemId) {
    case 'mm-tabclose':
      closeTab($(menu).data("tabTitle"));
      break;
    case 'mm-tabcloseall':
      for(var i=0; i<allTabtitle.length; i++){
        closeTab(allTabtitle[i]);
      }
      break;
    case 'mm-tabcloseother':
      for (var i = 0; i < allTabtitle.length; i++) {
        if (curTabTitle != allTabtitle[i]) {
          closeTab(allTabtitle[i]);
        }
      }
      $('#tabs').tabs('select', curTabTitle);
      break;
    case 'mm-tabcloseright':
      for (var i = curTabIndex; i < allTabtitle.length; i++) {
        closeTab(allTabtitle[i]);
      }
      $('#tabs').tabs('select', curTabTitle);
      break;
    case 'mm-tabcloseleft':
      for (var i = 0; i < curTabIndex-1; i++) {
        closeTab(allTabtitle[i]);
      }
      $('#tabs').tabs('select', curTabTitle);
      break;
    default :
      break;
  }
}