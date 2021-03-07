<!--
 * @Author: raotaohub
 * @Date: 2021-02-12 23:51:27
 * @LastEditTime: 2021-02-15 20:36:39
 * @LastEditors: raotaohub
 * @FilePath: \react-music\README.md
 * @Description: 项目描述和注意事项
-->

## 一、项目说明

个人学习之作品，借鉴掘金大佬神三元的案例，为未来开发zune做技术储备。

## 二、组件优化使用 React.memo()优化

- Component 的 2 个问题

1. 只要执行 setState(),即使不改变状态数据, 组件也会重新 render() ==> 效率低
2. 只当前组件重新 render(), 就会自动重新 render 子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

解决方式 1：重写 shouldComponentUpdate()方法

解决方式 2：使用 PureComponent

解决方式 3：本项目采用方案--React.memo()是一个高阶函数，它与 React.PureComponent 类似，但是一个函数组件而非一个类。

## 三、封装 scroll 组件和 forwardRef 的使用

- scroll 的参数

```js
Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]), // 滚动的方向
  click: true, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸底
};
```

- forwardRef 的使用

```js
const Scroll = forwardRef((props, ref) => {
  // 编写组件内容
});
```

## 懒加载 react-lazyload

- 采取一个成熟的方案 react-lazyload 库 `yarn add react-lazyload`

1. 图片懒加载
   `\react-music\src\components\list\index.js` <LazyLoad ..>...</LazyLoad>
2. 组件懒加载
   暂时未实施

## Redux 数据缓存

在`\react-music\src\application\Recommend\index.js` useEffect()调用中加 1 个判断当前数据量的逻辑

## Hooks

1. useMemo？？？？？？？？？？？？？？`有待深入考究`

## redux 命名规范

action type 规范

- MODULE*PAGE_ACTION_OTHER
  模块名*页面名*操作名*其他

## 动画实现

> $ npm install react-transition-group --save

一个成熟的react过渡动画库

实现点击跳转的一个动画效果

```css
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ (30deg) translate3d (100%, 0, 0);⭐
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ (0deg) translate3d (0, 0, 0);⭐
  }
  &.fly-exit {
    transform: rotateZ (0deg) translate3d (0, 0, 0);⭐
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ (30deg) translate3d (100%, 0, 0); ⭐
  }
设定 transfrom 的固定点，接下来的动画都是绕这个点旋转或平移
设置 rotateZ 的值，让整个页面能够拥有 Z 坐标方向的矢量
```

