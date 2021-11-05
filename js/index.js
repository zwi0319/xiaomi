window.addEventListener("load", function () {
  //获取元素
  var arrow1 = document.querySelector(".arrow-1"); //左边按钮
  var arrow2 = document.querySelector(".arrow-2"); //右边按钮
  var focus = document.querySelector(".focus"); //获取大盒子
  var focusWidth = focus.offsetWidth; //图片的宽度
  // 1、鼠标经过轮播按钮出现，离开消失
  focus.addEventListener("mouseenter", function () {
    arrow1.style.display = "block";
    arrow2.style.display = "block";
    clearInterval(timer);
    timer = null;
  });
  focus.addEventListener("mouseleave", function () {
    arrow1.style.display = "none";
    arrow2.style.display = "none";
    timer = setInterval(function () {
      arrow2.click(); //手动调用右侧点击事件
    }, 3000);
  });
  // 2、动态生成小圆圈
  var ul = focus.querySelector("ul"); //获取图片父亲ul
  var ol = focus.querySelector("ol"); //获取ol
  for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement("li"); //创建元素li
    li.setAttribute("index", i); //给小圆圈设置属性值
    ol.appendChild(li);
    //小圆圈排他思想
    li.addEventListener("click", function () {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      this.className = "current";
      //点击小圆圈移动ul图片
      var index = this.getAttribute("index");
      num = index;
      circle = index;
      animate(ul, -index * focusWidth);
    });
  }
  ol.children[0].className = "current"; //把ol里面的第一个li设置类名，更该颜色
  //克隆ul图片，放在最后面
  var first = ul.children[0].cloneNode(true); //深度克隆
  ul.appendChild(first);
  //点击两侧按钮，滚动图片
  var num = 0; //声明一个全局变量，可自增自减
  var circle = 0; //底下圆点滚动数值

  var flag = true; //节流阀

  arrow2.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      circle++;
      if (circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    }
  });
  //点击两侧按钮，滚动图片
  arrow1.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + "px";
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      circleChange();
    }
  });

  function circleChange() {
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    ol.children[circle].className = "current";
  }
  //自动滚动图片，定时器
  var timer = setInterval(function () {
    arrow2.click(); //手动调用右侧点击事件
  }, 3000);
});
