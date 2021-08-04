<template>
  <div style="width: 100%; height: 100vh;position: relative;">
    <div
      ref="earthContainer"
      style="width: 100%; height: 100vh;"
    ></div>
    <div
      class="box"
      style="position: absolute; left: 18px; top: 18px; color: white; background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 25px;min-width:150px; z-index:11;font-size:24px; font-family: 宋体;"
    >
      <div
        class="defultbtn"
        @click="measureMentType = 'POINT'"
      >位置测量</div>
      <div
        class="defultbtn"
        @click="measureMentType = 'SPACE_DISTANCE'"
      >距离测量</div>
      <div
        class="defultbtn"
        @click="measureMentType = 'TRIANGLE_DISTANCE'"
      >三角测量</div>
      <div
        class="defultbtn"
        @click="measureMentType = 'SPACE_AREA'"
      >面积测量</div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
// import bus from '@/assets/js/eventBus'
function createEarth(comp) {
  // 1.1.1 创建地球
  var earth = new XE.Earth(comp.$refs.earthContainer);
  earth.interaction.picking.enabled = true
  earth.interaction.picking.hoverEnable = false
  earth.czm.scene.globe.depthTestAgainstTerrain = false;
  console.log('font:', earth.czm.scene.postProcessStages)
  let earthUrl = process.env.NODE_ENV == 'development' ? 'http://10.1.18.239:8093/tileset.json' : 'http://10.5.48.13/tileset.json';
  // 1.1.2 添加默认地球影像
  earth.sceneTree.root = {
    "expand": true,
    children: [
      // {
      //   czmObject: {
      //     name: "默认离线影像",
      //     xbsjType: "Imagery",
      //     xbsjImageryProvider: {
      //       createTileMapServiceImageryProvider: {
      //         url: XE.HTML.cesiumDir + "Assets/Textures/NaturalEarthII",
      //         fileExtension: "jpg",
      //       },
      //       type: "createTileMapServiceImageryProvider",
      //     },
      //   },
      // },
      {
        "expand": true,
        "ref": 'gaode',
        "czmObject": {
          "enabled": true,
          "xbsjType": "Imagery",
          "name": "高德影像标注",
          "show": true,
          "brightness": 0.7,
          "saturation": 0.8,//饱和度
          "gamma": 0.8,
          "xbsjImageryProvider": {
            "XbsjImageryProvider": {

              // url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F06%2F20190106035350_uxiga.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629624885&t=ee3bc9f396166d221587a8baf25f7533',
              // "url":require('../../../assets/image/login-background.jpg'),
              // url:'http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/16/25863/53029',
              //  url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery',
              // "url": "//webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
              // "url": "http://shangetu1.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",
              // "srcCoordType": "BD09"
              url: require('../../../assets/image/earth/earthbg.png')
              // "maximumLevel": 15,  
              // "minimumLevel":9,
            }
          }
        },
      },
      {
        "ref": 'tileset',
        "czmObject": {
          name: "三维瓦片数据", // 可以不填写
          xbsjType: "Tileset", // 必填项
          // url: `${ window.location.protocol }//${ window.location.host }/dayanta/tileset.json`, // 必填项http://www.ab126.com/geometric/10631.html
          // url: 'http://10.5.48.13/tileset.json',
          url: 'http://10.1.18.239:8099/tileset.json',
          // url:`${ window.location.protocol }//${ window.location.host }/dayanta/tileset.json`, // 必填项
          // url:'http://10.5.48.13/tileset.json',
          // url: 'http://10.1.18.239:8093/tileset.json',
          // url:earthUrl,
          xbsjPosition: [  // 111.310483 35.421492  111.310483 - 0.004264000000006263 = 111.306219 
            //0.00022400000000288856 + 35.421492=35.421716
            1.9426601,
            0.6182256,
            -450,
          ],
          xbsjUseOriginTransform: false, // 可以不填写
          // skipLevelOfDetail: false,
          // xbsjScale: [1, 1,1]
        },
      },
    ],
  };
  // 303950 408084

  console.log('url:', `${ window.location.protocol }//${ window.location.host }/dayanta/tileset.json`)

  // 路径和上述json配置保持一致
  const tileset = earth.sceneTree.root.children[1].czmObject;

  XE.MVVM.bind(comp, 'measureMentType', earth.analyzation.measurement, 'type');
  // 1.2.4 数据双向绑定
  // disposers 用来收集资源销毁函数，并在析构时自动调用！
  comp._disposers = [];

  // 当url发生变动时，自动飞入3dtiles数据处
  // comp._disposers.push(XE.MVVM.watch(tileset, 'ready', ready => (ready && tileset.flyTo())));

  // 1.2.5 变量记录
  comp._tileset = tileset;

  comp._earth = earth;


  // 仅为调试方便用
  window.earth = earth;//changePoints中使用earth和this._earth不一样啊
  // var p = new XE.Obj.ClassificationPolygon(earth)
  // var p = new XE.Obj.Polyline(earth)
  // p.creating = true
  // p.creating = true
  // var p = new XE.Obj.Polyline(earth)
  // p.creating = true
  // 111.302179 35.406698

  // 相机直接飞向北京(116.39, 39.9)的位置，高度100米的目标，再距离目标点1000米的距离停下来，此时目标点刚好位置屏幕中心位置。
  // 同时相机的方向是正东向，向下倾斜30度。
  // 相机方向是这样的 朝北是0度，朝东是90度，朝南是180度，朝西是270度。抬头看天的俯仰角是90度，俯视地面是-90度。
  // earth.camera.flyTo([116.39*Math.PI/180, 39.9*Math.PI/180, 100], 1000, [90*Math.PI/180, -30*Math.PI/180, 0]);
  earth.camera.flyTo([1.9427047,
    0.6182174, 0], 800, [-30 * Math.PI / 180, -45 * Math.PI / 180, 0], 0);
  // earth.camera.flyTo([111.302179 * Math.PI / 180, 35.406698 * Math.PI / 180, 0], 800, [-30 * Math.PI / 180, -45 * Math.PI / 180, 0], 0);  //-30 * Math.PI / 180==-90的时候垂直，中心点未
  // earth.camera.position = [117.59481780555555 * Math.PI / 180, 40.51200825 * Math.PI / 180, 0];
  // earth.camera.rotation = [90 * Math.PI / 180, -30 * Math.PI / 180, 0];

  window.tileset = tileset;
  //  tileset.flyTo()
}

function createCesium(comp) {
  window.viewer = new Cesium.Viewer(comp.$refs.earthContainer);
}

// 1 创建Earth的vue组件
var EarthComp = {
  components: {},
  data() {
    return {
      message: "页面加载于 " + new Date().toLocaleString(),
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      _bgImagery: undefined,
      content: 0,
      measureMentType: 'POINT',
      dialogShow: false,
      dthArr: []
    };
  },
  computed: {
    scale() {
      return store.getters.scaleNumber
    },
  },
  // 1.1 资源创建
  mounted() {
    if (typeof XE !== "undefined") {
      createEarth(this);
    } else if (typeof Cesium !== "undefined") {
      createCesium(this);
    }
    // this.addPolyline()
    this.changePoints()
    // this.setDanTiHua()
  },
  // 1.2 资源销毁
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth && this._earth.destroy();
  },
  methods: {
    initlocaltion() {
      this._earth.camera.flyTo([1.9016974701882112, 0.5972325152147303, 425.8641913624607], 1000)
    },
    changePoints() {
      var that = this
      var d = []
      let entities = that._earth.czm.viewer.entities._entities._array
      console.log('entities:', entities)
      // let entities=viewer.entities._entities._array
      // viewer.entities.removeById(id)//2
      // for (var i = entities.length - 1; i >= 0; i--) {
      //   that._earth.czm.viewer.entities.remove(entities[i]);
      //   //删除实体元素
      // }
      for (var i = 0; i < entities.length; i++) {
        if (entities[i]._type == '"polyline"') {
          continue
        }
        that._earth.czm.viewer.entities.remove(entities[i]) //从DOM中删除匹配的元素集。
      }
      console.log('删除的实体:', entities)
      var positions_ = [], entity, temp = true;
      positions_ = [
        {
          longitude: 111.308506,
          latitude: 35.421526,
          height: 150,
          value: 'hightopo 一区',
        }
      ]
      d = positions_//防止跟行参冲突
      console.log('positions)+:', d)
      var entity
      if (d && d.length > 0) {
        d.forEach((element, index) => {
          entity = this.AddPoint(this._earth, element);
          element._entity = entity;
        })
      }
      var canvasbox = this._earth.czm.viewer.canvas, pickPosition = {}, dialogModel = this.$refs.dialogModel;
      console.log('canvasbox', canvasbox)
      canvasbox.onclick = e => {
        pickPosition.x = e.offsetX;
        pickPosition.y = e.offsetY;
        var picked = that._earth.czm.viewer.scene.pick(pickPosition);
        if (picked !== undefined && picked.id !== undefined) {
          d.forEach(item => {
            if (picked.id === item._entity) {
              console.log('点击的参数:', item._entity.billboard)
              that.$emit('clickEvent')
              // bus.$emit('showEarthEmissionDialog', {areaIds:item._entity._areaIds,type:item._entity._type,areaId:item._entity.areaId})
            } 
          })
        } else {
          this.dialogShow = false;
        }
      }
      let et = {}
      canvasbox.onmousemove = e => {
        // console.log('悬浮,',that._earth.czm.viewer.scene.pick(pickPosition))
        pickPosition.x = e.offsetX;
        pickPosition.y = e.offsetY;

        var picked = that._earth.czm.viewer.scene.pick(pickPosition);
        if (et.type) {
          et.billboard.scale = 1
          et.label.scale = 1
        }
        if (picked !== undefined && picked.id !== undefined && picked.id.type == 'entity') {
          d.forEach(item => {
            if (picked.id === item._entity) {
              // console.log('点击的参数:', item._entity.billboard)
              item._entity.billboard.scale = 1.2
              item._entity.label.scale = 1.2
              et = item._entity
              // bus.$emit('showEarthEmissionDialog', {areaIds:item._entity._areaIds,type:item._entity._type,areaId:item._entity.areaId})
            }
          })
        }
      }
      //此处主意this._earth.camera.position 和earth.camera.position，虽然earth===this._earth，但是camera.position就给了window.earth了，而不是_this.earth
      //单体化代码
    },
    setDanTiHua() {
      var that = this
      /**设置单体化*/
      // var classificationpolygon = new XE.Obj.ClassificationPolygon(this._earth);
      // 设置相机位置
      //   // earth.camera.position.toString()和earth.camera.toAllJSONStr()这两个方法可获取相机位置
      // this._earth.camera.position = [  2.0524546659348455,0.707110547134616,-430];
      // this._earth.camera.rotation = [0.027900493226680645, -0.6716444402205366, 0.00011144258520534578];
      var loactionData = [
        {
          color: [0.255, 0.455, 0.7333, 0.6],
          data: [
            1.9427585449571216, 0.6181548775782182,
            1.9426659306084029, 0.6180944698756166,
            1.942636417872578, 0.6181239340065074,
            1.9426693722255295, 0.618147214798807,
            1.9426682034413514, 0.6181485977300625,
            1.9426815369841517, 0.6181570588314315,
            1.9426715197485507, 0.6181693985099614,
            1.9427209386312438, 0.6181987266721491
          ],
          height: 120
        }
        , {
          color: [0.157, 0.603, 0.141, 0.6],
          data: [
            1.9425445345095531, 0.617920432290727,
            1.9425113131955292, 0.6178995058994227,
            1.9425100137576619, 0.6178987077844892,
            1.9424970978210214, 0.6179133811417921,
            1.9425314318598135, 0.6179354478487689
          ],
          height: 120
        }
      ]

      // var loactionData = [
      //   {
      //     data:[2.0525365,0.7070954,2.0525533,0.7071143,2.0525289,0.7071254,2.052513,0.7071084],
      //     color:[0.4, 0.9, 0.4, 0.6],
      //     height:150
      //   },
      //   {
      //     data:[2.0523303,0.7070279,2.0523555, 0.7070541, 2.0523543,0.7070217],
      //     color:[0.2, 0.4, 0.9, 0.6],
      //     height:150
      //   },{
      //     data:[2.0523838,0.7070419,2.0523898,0.7070478,2.0523995,0.7070439,2.0523991,0.7070391,2.0523941,0.7070353,2.0523895,0.7070361],
      //     color:[0.9, 0.4, 0.7, 0.6],
      //     height:150
      //   }
      // ]

      if (that.dthArr && that.dthArr.length > 0) {
        console.log('leng:', that.dthArr[i])
        for (var i = 0; i < that.dthArr.length; i++) {
          if (that.dthArr[i]) that.dthArr[i].destroy()
        }
      }
      // console.log('dataSources:', this._earth._viewer._dataSourceCollection._dataSources)
      // let ddd = this._earth._viewer._dataSourceCollection._dataSources
      // if(ddd.length>0){
      //   // ddd[i].destroy()
      // }
      that.dthArr = []
      for (var i = 0; i < loactionData.length; i++) {
        console.log('loactionData:', loactionData[i])
        that.dthArr.push('')
        var variable = 'variable' + i
        variable = new XE.Obj.ClassificationPolygon(this._earth);
        variable.positions = loactionData[i].data;
        variable.height = loactionData[i].height;
        // variable.color = loactionData[i].color;
        variable.color = loactionData[i].color
        console.log('classificationpolygon:', this._earth)
        this.dthArr[i] = variable
        //奇怪的很，不能push!!!!!!!
        // variable.destroy()
        // console.log('this.dthArr:',that.dthArr)
      }
      //    for(var i=0;i<that.dthArr.length;i++){
      //         console.log('我要销毁:',that.dthArr[i])
      //         //  that.dthArr[i].destroy()
      //  }

    },
    AddPoint(earth, e, code) {
      let that = this
      let fs = 42
      let billHeight = 100
      let billWidth = 445
      let fontSize = `${ fs * this.scale }px 微软雅黑`
      var pinBuilder = new Cesium.XbsjPinBuilder();
      var x = 3;//控制频率改变x大小越大闪烁间隔越大
      var ha = true;
      var alp = 1;
      var num = 0;
      const entity = earth.czm.viewer.entities.add({
        // name: e.Equipment_Name,
        position: Cesium.Cartesian3.fromDegrees(e.longitude, e.latitude, e.height),
        // type: e.type ? e.type : '',
        // point: {
        //   pixelSize: 1,
        //   outlineWidth: 0,
        // },
        type: 'entity',
        polyline: {
          positions: [
            Cesium.Cartesian3.fromDegrees(e.longitude, e.latitude, e.height - 140),
            Cesium.Cartesian3.fromDegrees(e.longitude, e.latitude, e.height),
          ],
          eyeOffset: new Cesium.Cartesian3(0, 0, 2), //这里可以借助eyeOffset属性设置z值为负（即z轴方向上离眼睛更近来解决,-100在地图放大到一定程度后就看不见了）
          width: 2.0,
          material: Cesium.Color.fromCssColorString('#89e089').withAlpha(1),
          // material: new Cesium.Color(0.4, 0.4, 0.4, 0.8),
        },
        billboard: {
          // image: pinBuilder.fromColor(new Cesium.Color(0.2, 0.8, 0.2, 1.0), 50, new Cesium.Color(0.2, 0.5, 0.2, 1.0)),
          image: require('../../../assets/image/earth/pointBg.png'),

          // color: new Cesium.Color(1.0, 1.0, 1.0, 1),
          verticalOrigin: Cesium.VerticalOrigin.MIDDLE,
          // scale: that.scale,
          show: true,
          width: 120,
          height: 40,
          // color: new Cesium.Color(1.0, 1.0, 1.0, 1),
          // eyeOffset: new Cesium.Cartesian3(0, 0, -10), //这里可以借助eyeOffset属性设置z值为负（即z轴方向上离眼睛更近来解决,-100在地图放大到一定程度后就看不见了）
          // color:new Cesium.Color(1.0, 1.0, 1.0, 0.4),
          // pixelOffset: new Cesium.Cartesian2(0, -billHeight*that.scale/2),
          //   color: new Cesium.CallbackProperty(function color(time,result) {
          //     //上面记得定义变量
          //    if(ha){
          //       x-=0.2;
          //       if(x<=0){
          //         ha=false;
          //         color=Cesium.Color.BLUE;
          //       }
          //     }else{
          //       x+=0.2;
          //       if(x>=3){//这里也要改动
          //         ha=true;
          //         color = Cesium.Color.RED;
          //       }
          //     }
          //    return color;
          // }, false),
          // color:new Cesium.CallbackProperty(function color() {
          //   if ((num % 2) === 0){
          //     alp -=0.005;
          //   }else {
          //     alp +=0.005;
          //   }
          //   if (alp <= 0.0){
          //     num++;
          //   }else if (alp >= 1){
          //     num++;
          //   }
          //   return  new Cesium.Color.WHITE.withAlpha(alp)
          //   //entity的颜色透明 并不影响材质，并且 entity也会透明
          // },false),
          // color: new Cesium.CallbackProperty(function color() {//关键代码
          //   return Cesium.Color.fromRandom({
          //     minimumRed: 0.76,
          //     minimumGreen: 0.78,
          //     minimumBlue: 0.75,
          //     alpha: 1.0
          //   });
        },
        label: {
          text: e.value,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          font: fontSize,
          // fillColor:new Cesium.Color(1.0, 1.0, 1.0, 1),
          // outlineColor: new Cesium.Color(1.0, 1.0, 1.0, 1),
          fillColor: new Cesium.Color(1.0, 1.0, 1.0, 1),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          scale: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          // showBackground:true,
          // backgroundColor:Cesium.Color.BLACK,
          // backgroundPadding:new Cesium.Cartesian3(10, 15),
          eyeOffset: new Cesium.Cartesian3(0, 0, -1), //这里可以借助eyeOffset属性设置z值为负（即z轴方向上离眼睛更近来解决,-100在地图放大到一定程度后就看不见了）
          // pixelOffset: new Cesium.Cartesian2(10,20*that.scale),
        }
      });
      return entity;
    },

    addPolyline() {
      var boundArr = [
        [1.9425489741327133, 0.6180325004872744], 
        [1.9425406763507098, 0.6180410574862762], 
        [1.9425535621137222, 0.6180493169254136], 
        [1.9425598686558139, 0.6180430205638059], 
        [1.9425663768726247, 0.6180470452972728], 
        [1.942567682266996, 0.6180477399894972], 
        [1.9425705658651287, 0.6180451886835968], 
        [1.9425764221230486, 0.6180487301366264], 
        [1.9425737670791858, 0.6180519294208058], 
        [1.9426238574736348, 0.6180834997364145], 
        [1.942660852326081, 0.6180454856372927], 
        [1.9425765676383329, 0.6179910282469097], 
        [1.9425719439848186, 0.617995479564968], 
        [1.9425708756914346, 0.6179950550336928], 
        [1.942565694342862, 0.6180002118460496], 
        [1.9425605436754019, 0.6179975675160805], 
        [1.9425509814608282, 0.6180085624598064], 
        [1.9425542787700831, 0.6180102166893771], 
        [1.9425381236099033, 0.6180269528800222], 
        [1.942548729371931, 0.6180326892725585]
      ]

      // var a = boundArr.replace(/\n/g, "");
      // console.log('aaaa:', a)
      let newArr = []
      boundArr.forEach((item, index) => {
        var n_lng = item[0] * 180 / Math.PI
        var n_lat = item[1] * 180 / Math.PI
        newArr.push(n_lng, n_lat, item[2])
      })
      const entity = this._earth.czm.viewer.entities.add({
        name: 'Red line on terrain',
        type: 'polyline',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights(newArr),
          width: 3,
          material: Cesium.Color.fromCssColorString('#89e089').withAlpha(0.4),
          //   material: new Cesium.PolylineGlowMaterialProperty({
          //   glowPower: 0.01,
          //   color: Cesium.Color.fromCssColorString('#0815E9').withAlpha(0.9)
          // }),
          // material: new Cesium.PolylineGlowMaterialProperty({
          //   glowPower: 0.1,
          //   // color: Cesium.Color.GREEN.withAlpha(1),
          //   color: Cesium.Color.GREEN,
          // }),
          // material :new Cesium.PolylineOutlineMaterialProperty({
          //     color : Cesium.Color.GREEN,
          //     outlineWidth : 1,
          //     outlineColor : Cesium.Color.WHITE
          // }),
          //  shadows : Cesium.ShadowMode.ENABLED,
          followSurface: true, //是否贴着地表
          clampToGround: true //贴地
        }
      })
    }
  }
};

export default EarthComp;
</script>
