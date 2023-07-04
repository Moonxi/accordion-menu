var titles = document.querySelectorAll('.menu h2')

var itemHeight = 30 // 每个子菜单的高度
var duration = 200
for (var i = 0; i < titles.length; i++) {
  titles[i].onclick = function () {
    var submenus = document.querySelectorAll('.submenu[status="opened"]')
    for (var i = 0; i < submenus.length; i++) {
      closeSubmenu(submenus[i])
    }
    toggleSubmenu(this.nextElementSibling)
  }
}

/**
 * 打开子菜单
 * @param {HTMLUListElement} submenu
 */
function openSubmenu(submenu) {
  // 获取子菜单状态
  var status = submenu.getAttribute('status')
  if (status && status !== 'closed') {
    return
  }
  submenu.setAttribute('status', 'loading')
  createAnimation({
    from: 0,
    to: submenu.children.length * itemHeight,
    duration: duration,
    frame(n) {
      submenu.style.height = n + 'px'
    },
    end() {
      submenu.setAttribute('status', 'opened')
    }
  })
}

// test
var testMenu = document.querySelector('.submenu')

// 关闭子菜单
function closeSubmenu(submenu) {
  var status = submenu.getAttribute('status')
  if (status !== 'opened') {
    return
  }
  submenu.setAttribute('status', 'loading')
  createAnimation({
    from: submenu.children.length * itemHeight,
    to: 0,
    duration: duration,
    frame(n) {
      submenu.style.height = n + 'px'
    },
    end() {
      submenu.setAttribute('status', 'closed')
    }
  })
}

// 切换子菜单
function toggleSubmenu(submenu) {
  var status = submenu.getAttribute('status')
  if (status === 'loading') {
    return
  } else if (status === 'opened') {
    closeSubmenu(submenu)
  } else {
    openSubmenu(submenu)
  }
}
