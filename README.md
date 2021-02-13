<!--
 * @Author: raotaohub
 * @Date: 2021-02-12 23:51:27
 * @LastEditTime: 2021-02-13 21:20:36
 * @LastEditors: raotaohub
 * @FilePath: \react-music\README.md
 * @Description: 项目描述和注意事项
-->

## 一、项目规范

在介绍项目功能之前，我有必要强调一个这个项目工程的开发规范和我个人的编码风格，提前告知一下，我这么做也是有自己充分的理由的，让项目可读性和可维护性尽可能高，希望后面看到一些 "奇葩" 的操作不要感到奇怪。

1、class 组件不再用，全面拥抱 hooks ，统一用函数组件。

2、组件内部状态用 hooks 处理，凡是业务数据全部放在 redux 中管理。

3、 ajax 请求以及后续数据处理的具体代码全部放在 actionCreator 中，由 redux-thunk 进行处理，尽可能精简组件代码。

4、每一个容器组件都有自己独立的 reducer，然后再全局的 store 下通过 redux 的 combineReducer 方法合并。

5、JS 变量名 (包括函数名) 采用小驼峰的方式，组件名或者 styled-components 导出的样式容器名都采用大驼峰，常量名所有字母大写。

6、普通 CSS 类名全部用英语小写，单词间用下划线连接，CSS 动画钩子类名中单词用 - 连接。

7、凡是 props 中有数据的，全部在组件最前面提前解构赋值，并且，获得的属性名和方法名要分开声明，从父组件获得的 props 和通过 react-redux 中映射获得的 props 也要分开声明。

8、useEffect 统一写在最前面，并且紧跟着 props 解构赋值代码后面。

9、凡是负责返回 JSX 的函数，统一聚集在函数最后面，中间不要穿插事件处理函数和其他逻辑。

10、mapDispatchToProps 返回的函数中，函数名格式为 xxxDispatch，以免和现有 action 名冲突。

11、每个组件都应用 memo 包裹，使得 React 在更新组件之前进行 props 的比对，若 props 不变则不对组件更新，减少不必要的重渲染。

## 二、组件优化使用 React.memo()优化

- Component 的 2 个问题

1. 只要执行 setState(),即使不改变状态数据, 组件也会重新 render() ==> 效率低
2. 只当前组件重新 render(), 就会自动重新 render 子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

解决方式 1：重写 shouldComponentUpdate()方法
解决方式 2：使用 PureComponent
本项目采用方案：React.memo()是一个高阶函数，它与 React.PureComponent 类似，但是一个函数组件而非一个类。

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
