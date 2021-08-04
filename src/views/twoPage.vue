<template>
  <div class="carIndex">
   <earthTwo @clickEvent="clickEvent"></earthTwo>
  </div>
</template>
<script>
  import earthTwo from './components/earth/earthTwo'
  export default {
  components: { earthTwo },
  name: "slideList",//这个名字不能跟components重复
  data() {
    return {
  
    };
  },
  watch: {
    $route: {
      handler: function (route) {
     
      },
      immediate: true
    }
  },
  filters: {
  
  },
  computed: {
  },
  mounted() {
    // console.log('分辨率:',window.devicePixelRatio)
    // alert(document.body.clientWidth)
    //  this.init()
  },
  created() {
   
  },
  methods: {
    clickEvent(){
      alert('我是点击事件')
    }
  }
};
</script>
<style scoped lang="scss">
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}
@mixin flexStyle($jc, $wrap) {
  display: flex;
  justify-content: $jc;
  align-items: center;
  flex-wrap: $wrap;
}
.carIndex {
  background: #ff07;
  min-height: 100vh;
  .wrap {
    .part-one {
      padding: 0px 24px;
      background: #001529;
      @include flexStyle(space-between, nowrap);
      height: 44px;
      .logo {
        width: 90px;
        height: 38px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .userdos {
        color: #ffffff;
        @include flexStyle(space-between, nowrap);
        .content {
          @include flexStyle(flex-end, nowrap);
        }
      }
    }
    .part-two {
      margin: 16px auto;
      padding: 0px 24px;
      box-sizing: border-box;
      ul {
        @include flexStyle(flex-start, wrap);
        li {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-right: 32px;
          margin-bottom: 12px;
        }
      }
    }
    .part-three {
      padding: 0 24px;
      margin: auto;
      box-sizing: border-box;
      ul {
        @include flexStyle(space-between, nowrap);
        li {
          width: 32%;
          height: 85px;
          background: #ffffff;
          border-radius: 1px;
          @include flexStyle(space-between, nowrap);
          color: #333333;
          padding: 0 9px;
          box-sizing: border-box;
        }
      }
    }
    .part-four {
      margin-top: 16px;
      padding: 0 24px;
      box-sizing: border-box;
      .wrap {
        background: white;
        height: 70px;
        padding: 0 16px;
        @include flexStyle(space-between, nowrap);
        .tab {
          @include flexStyle(flex-start, nowrap);
          p {
            width: 57px;
            height: 42px;
            line-height: 42px;
            border-bottom: solid 2px transparent;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
          }
        }
        .forms {
          @include flexStyle(flex-end, nowrap);
        }
      }
      .table-wrap {
        padding: 0 24px;
        box-sizing: border-box;
        background: white;
      }
    }
  }
}
.activeTab {
  border-bottom: solid 2px #19bc9e !important;
}
.button-self {
  background: #19bc9e;
  color: white;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  height: 32px;
  padding: 5px 5px !important;
}

.font-style-1 {
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.font-style-2 {
  font-size: 22px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  font-style: normal;
}
.font-style-3 {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  font-style: normal;
}
.iconstyle-1 {
  color: rgba(255, 255, 255, 0.69);
  width: 24px;
  height: 24px;
}
.iconstyle-2 {
  color: rgba(255, 255, 255, 0.69);
  width: 18px;
  height: 18px;
}
.color-red {
  color: #ec5757;
}
.m-r-8 {
  margin-right: 8px;
}
.m-r-10 {
  margin-right: 10px;
}
.m-r-20 {
  margin-right: 20px;
}
.m-r-16 {
  margin-right: 16px;
}
.m-b-16 {
  margin-bottom: 16px;
}
.w-138 {
  width: 138px;
}
.w-230 {
  width: 230px;
}

::v-deep .el-input-90 {
  width: 90px;
  .el-input__inner {
    width: 100%;
  }
}
::v-deep .el-input-184 {
  width: 184px;
  .el-input__inner {
    width: 100%;
  }
}
.table-wrap ::v-deep .el-table .el-table__header-wrapper th,
.table-wrap ::v-deep .el-table .el-table__fixed-header-wrapper th {
  height: 30px;
  line-height: 30px;
}
::v-deep .el-table .cell {
  height: 30px !important;
  line-height: 30px;
}
.table-wrap ::v-deep .el-table .el-table__header-wrapper th {
  background: #f5f5f5;
}
.status-common {
  color: #333333;
  position: relative;
  display: block;
  text-align: left;
  text-indent: 20px;
}
.statusDaiChuLi {
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: #da5d5d;
    border-radius: 50%;
  }
}
.statusChuLiZhong {
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: #1890ff;
    border-radius: 50%;
  }
}
.statusYiChuLi {
  color: #999999;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: #999999;
    border-radius: 50%;
  }
}

.c-float-modePop {
  width: 450px;
  overflow: hidden;
  border-radius: 6px;
  text-align: center;
  background-color: #fafafc;
  padding: 0px;
  border-radius: 5px;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.c-float-popWrap .c-float-modePop .warnMsg {
  padding: 20px 20px 0 20px;
  font-size: 20px;
  color: #5f5f5f;
  font-weight: 500;
}
.c-float-popWrap.confirmMode .c-float-modePop .content,
.c-float-popWrap.confirmMode .c-float-modePop .doBtn {
  display: flex;
}
.c-float-popWrap.confirmMode .c-float-modePop .doBtn {
  border-top: 1px solid #d5d5d6;
}
.c-float-popWrap .c-float-modePop .content {
  padding: 20px 20px;
  font-size: 18px;
  color: #888;
  word-wrap: break-word;
  word-break: break-all;
  text-align: center;
}
.weui_mask_transparent {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
}
.c-float-popWrap .c-float-modePop button.cancel {
  position: relative;
}
.c-float-popWrap .c-float-modePop button {
  background-color: #fafafc;
  width: 50%;
  height: 50px;
  line-height: 50px;
  color: #444;
  font-size: 18px;
  border: 0;
  padding: 0;
}
.c-float-popWrap .c-float-modePop button.cancel:after {
  content: " ";
  position: absolute;
  right: -1px;
  top: 0;
  width: 1px;
  height: 100%;
  border-left: 1px solid #d5d5d6;
  color: #d5d5d6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.c-float-popWrap .c-float-modePop button.ok {
  color: #19bc9e;
}

.c-float-popWrap .c-float-modePop button {
  background-color: #fafafc;
  width: 50%;
  height: 50px;
  line-height: 50px;
  color: #444;
  font-size: 18px;
  border: 0;
  padding: 0;
}
.c-float-modePop button {
  padding: 6px 9px 6px 9px;
  color: #949494;
  border: 0;
}
</style>
<style lang="scss" scoped>
::v-deep .car-date-common .el-date-editor .el-range__icon {
  font-size: 12px;
  line-height: 30px;
}
::v-deep .car-date-common .el-range__close-icon {
  width: 11px;
  font-size: 14px;
}
::v-deep .car-date-common .el-range-input {
  font-size: 12px;
}
::v-deep .car-date-common .el-range-separator {
  font-size: 12px;
  padding: 0 3px;
}
::v-deep .el-range-editor.el-input__inner {
  padding: 3px 2px 3px 5px;
}
::v-deep .car-date-common .el-input__icon {
  width: 15px;
}
::v-deep .car-date-common .el-picker-panel {
  position: absolute;
  top: 40px;
  z-index: 2001;
  right: -75px;
  width: 514px;
}
</style>