<template>
  <div style="width: 100%; height: 100%;position: relative;">
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
          "brightness": 1,
          "saturation": 1,
          "gamma": 1,
          "xbsjImageryProvider": {
            "XbsjImageryProvider": {

              // url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F06%2F20190106035350_uxiga.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629624885&t=ee3bc9f396166d221587a8baf25f7533',
              // "url":require('../../../assets/image/login-background.jpg'),
              // url:'http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/16/25863/53029',
              //  url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery',
              // "url": "//webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
              "url": "http://shangetu1.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",
              "srcCoordType": "BD09"
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
          // url: 'http://10.1.18.239:8098/tileset.json',
          // url:`${ window.location.protocol }//${ window.location.host }/dayanta/tileset.json`, // 必填项
          // url:'http://10.5.48.13/tileset.json',
          url: 'http://10.1.18.239:8093/tileset.json',
          // url:earthUrl,
          xbsjPosition: [
            // 40.30.43.2296999999961429   40.51200825  相加40.5142735 0.7071075
            // 117.35.41.3440999999875203  117.59481780555555 =117.5970686111111 2.0526109
            // 496.497
            // // 可以不填写度转弧度
            // 2.0524168 ,//--没调之前的
            // 0.707068,//
            2.0524546659348455,
            0.707110547134616,
            -430,
          ],
          xbsjUseOriginTransform: false, // 可以不填写
          skipLevelOfDetail: false,
          // xbsjScale: [1, 1,1]
          // xbsjScale: [1, 1, 1]
        },
      },
      // {
      //   "ref": "polygon",
      //   "czmObject": {
      //     "xbsjType": "GeoSmoothPolygon",
      //     "positions": [
      //       [2.0526407388732535, 0.7070363265326671,0],
      //       [2.0526589917044067, 0.7070273822989919,0],
      //       [2.0525332880274005, 0.7070302891824976,0],
      //       [2.0524966113567302, 0.7070319734056404,0],
      //       [2.052491448119782, 0.7069865321545481,0],
      //       [2.052475312859978, 0.7069558317192143,0],
      //       [2.052455082658649, 0.7069361121856691,0],
      //       [2.0523918906533956, 0.7068898853593195,0],
      //       [2.052253851853802, 0.7069415173217733,0],
      //       [2.052233882537518, 0.7069706009830928,0],
      //       [2.0522588948440887, 0.7070200964399544,0],
      //       [2.0522855278266867, 0.7070895580256915,0],
      //       [2.052336428634959, 0.7071958350712196,0],
      //       [2.052408617572781, 0.7072611016019392,0],
      //       [2.052481696152559, 0.7072850064775951,0],
      //       [2.0527600157672863, 0.7071563948640482,0],
      //       [2.0527443620313424, 0.7070275822595236,0],
      //       [2.0527250523195457, 0.7070212953511836,0],
      //       [2.0522586060838655, 0.7068430143255781,0]
      //     ]
      //   }
      // }
      // {
      //                   "ref": 'polyline1',
      //                   "czmObject": {
      //                       "xbsjType": "Polyline",
      //                       "positions": [
      //                           [2.0526407388732535, 0.7070363265326671,0],
      //       [2.0526589917044067, 0.7070273822989919,0],
      //       [2.0525332880274005, 0.7070302891824976,0],
      //       [2.0524966113567302, 0.7070319734056404,0],
      //       [2.052491448119782, 0.7069865321545481,0],
      //       [2.052475312859978, 0.7069558317192143,0],
      //       [2.052455082658649, 0.7069361121856691,0],
      //       [2.0523918906533956, 0.7068898853593195,0],
      //       [2.052253851853802, 0.7069415173217733,0],
      //       [2.052233882537518, 0.7069706009830928,0],
      //       [2.0522588948440887, 0.7070200964399544,0],
      //       [2.0522855278266867, 0.7070895580256915,0],
      //       [2.052336428634959, 0.7071958350712196,0],
      //       [2.052408617572781, 0.7072611016019392,0],
      //       [2.052481696152559, 0.7072850064775951,0],
      //       [2.0527600157672863, 0.7071563948640482,0],
      //       [2.0527443620313424, 0.7070275822595236,0],
      //       [2.0527250523195457, 0.7070212953511836,0],
      //       [2.0522586060838655, 0.7068430143255781,0]
      //                       ]
      //                   }
      //               }
    ],
  };

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
  //   var p = new XE.Obj.Polyline(earth)
  // p.creating = true
  // earth.camera.flyTo([117.59481780555555 * Math.PI / 180, 40.51200825 * Math.PI / 180, 0], 2300, [90 * Math.PI / 180, -30 * Math.PI / 180, 0],3);
  earth.camera.position = [117.59481780555555 * Math.PI / 180, 40.51200825 * Math.PI / 180, 0];
  earth.camera.rotation = [90 * Math.PI / 180, -30 * Math.PI / 180, 0];
  console.log('camear:', earth.camera)
  earth.camera.flyAround([117.59481780555555 * Math.PI / 180, 40.51200825 * Math.PI / 180, 0], 2300, [90 * Math.PI / 180, -30 * Math.PI / 180, 0], 3, 0.000)
  window.tileset = tileset;
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

    // this.changePoints([],100)
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
    changePoints(positions, code) {
      var that = this
      var d = []
      let entities = that._earth.czm.viewer.entities._entities._array
      // let entities=viewer.entities._entities._array
      // viewer.entities.removeById(id)//2
      for (var i = entities.length - 1; i >= 0; i--) {
        that._earth.czm.viewer.entities.remove(entities[i]);
        //删除实体元素
      }
      // for (var i = 0; i < entities.length; i++) {
      //   that._earth.czm.viewer.entities.remove(entities[i]) //从DOM中删除匹配的元素集。
      // }
      console.log('删除的实体:', entities)
      var positions_ = [], entity, temp = true;
      // positions_ = [
      //   {
      //     longitude: 117.590596,
      //     latitude: 40.510091,
      //     height:145,
      //     value: '生产工艺过程',
      //     types:'PRODUCTION_PROCESS_TECHNICAL',
      //     width:350
      //   },
      //   {
      //     longitude: 117.593389,
      //     latitude: 40.510491,
      //     height:145,
      //     value: '物料封闭运输',
      //     types:'MATERIALS_CLOSED_TRANSPORTATION',
      //     width:350
      //   },
      //   {
      //     longitude: 117.601429,
      //     latitude: 40.514506,
      //     height:145,
      //     value: '物料密闭存储和密闭输送',
      //     types:'MATERIALS_CLOSED_STORAGE_AND_TRANSPORTATION',
      //     width:600
      //   },
      //   {
      //     longitude: 117.601459,
      //     latitude: 40.519006,
      //     height:145,
      //     value: '物料密闭存储',
      //     types:'MATERIALS_CLOSED_STORAGE',
      //     width:350
      //   }, 
      // ]
      // let p_data = JSON.parse(JSON.stringify(positions)).filter((item)=> {
      //   return item.areaPointVO.informationPoint && item.areaPointVO.informationPoint.length>0
      // })
      var p_data = JSON.parse(JSON.stringify(positions)).filter((item) => item.areaPointVO.informationPoint && item.areaPointVO.informationPoint.lng)
      if (p_data && p_data.length <= 0) {
        return
      }

      p_data.forEach((item) => {
        let obj = {
          longitude: item.areaPointVO.informationPoint.lng,
          latitude: item.areaPointVO.informationPoint.lat,
          height: 157,
          width: 400,
          value: item.area.nameFull + ':' + item.num,
          num: item.num,
          areaIds: item.areaIds,
          areaId: item.area.id,
          type: code
        }
        positions_.push(obj)
      })

      d = positions_//防止跟行参冲突
      console.log('positions)+:', d)
      var entity
      if (d && d.length > 0) {
        d.forEach((element, index) => {
          if (element.num && element.num !== 0) {
            entity = this.AddPoint(this._earth, element);
            element._entity = entity;
          }
        })
      }
      var canvasbox = this._earth.czm.viewer.canvas, pickPosition = {}, dialogModel = this.$refs.dialogModel;
      canvasbox.onclick = e => {
        pickPosition.x = e.offsetX;
        pickPosition.y = e.offsetY;
        var picked = that._earth.czm.viewer.scene.pick(pickPosition);
        if (picked !== undefined && picked.id !== undefined) {
          d.forEach(item => {
            if (picked.id === item._entity) {
              console.log('点击的参数:', item._entity)
              // bus.$emit('showEarthEmissionDialog', {areaIds:item._entity._areaIds,type:item._entity._type,areaId:item._entity.areaId})
            }
          })
        } else {
          this.dialogShow = false;
        }
      }

      //此处主意this._earth.camera.position 和earth.camera.position，虽然earth===this._earth，但是camera.position就给了window.earth了，而不是_this.earth
      //单体化代码
    },
    setDanTiHua(positions) {
      var that = this
      /**设置单体化*/
      // var classificationpolygon = new XE.Obj.ClassificationPolygon(this._earth);
      // 设置相机位置
      //   // earth.camera.position.toString()和earth.camera.toAllJSONStr()这两个方法可获取相机位置
      // this._earth.camera.position = [  2.0524546659348455,0.707110547134616,-430];
      // this._earth.camera.rotation = [0.027900493226680645, -0.6716444402205366, 0.00011144258520534578];
      // test1 = [117.589863,40.509713,117.591306,40.511217,117.591237,40.509357]
      // test2=[117.601676,40.513582,117.602638,40.514663,117.601242,40.515299,117.600328,40.514326]
      // var test4 = [117.592925,40.510516,117.593271,40.510856,117.593828,40.510629,117.593802,40.510353,117.593515,40.510136,117.593254,40.510185]
      var positionData = JSON.parse(JSON.stringify(positions)).filter((item) => item.areaPointVO.singleDrawingPoint && item.areaPointVO.singleDrawingPoint.length > 0)
      if (positionData && positionData.length <= 0) {
        return
      }
      var loactionData = []
      // let colors = [[0.4, 0.9, 0.4, 0.6], [0.2, 0.4, 0.9, 0.6], [0.9, 0.4, 0.7, 0.6]]
      //中间大的是绿色 右边大的是蓝色 左边大的是红色
      positionData.forEach((item, i) => {
        console.log('item:', item)
        let d = item.areaPointVO.singleDrawingPoint
        var arr = []
        d.forEach((e) => {
          arr.push(e.lng * Math.PI / 180)
          arr.push(e.lat * Math.PI / 180)
        })
        let o = {
          data: arr,
          color: item.color,
          height: 450,
          num: item.num,
        }
        loactionData.push(o)
      })

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
        console.log('loactionData:', loactionData[i].num)
        if (loactionData[i].num && loactionData[i].num !== 0) {
          that.dthArr.push('')
          var variable = 'variable' + i
          variable = new XE.Obj.ClassificationPolygon(this._earth);
          variable.positions = loactionData[i].data;
          variable.height = loactionData[i].height;
          variable.color = loactionData[i].color;
          console.log('classificationpolygon:', this._earth)
          this.dthArr[i] = variable
        }

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
      console.log('areaIds:', e)
      const entity = earth.czm.viewer.entities.add({
        // name: e.Equipment_Name,
        position: Cesium.Cartesian3.fromDegrees(e.longitude, e.latitude, e.height),
        areaIds: e.areaIds,
        areaId: e.areaId,
        type: e.type ? e.type : '',
        // point: {
        //   pixelSize: 1,
        //   outlineWidth: 0,
        // },
        polyline: {
          positions: [
            Cesium.Cartesian3.fromDegrees(e.longitude, e.latitude, e.height - 145),
            Cesium.Cartesian3.fromDegrees(e.longitude, e.latitude, e.height),
          ],
          eyeOffset: new Cesium.Cartesian3(0, 0, 2), //这里可以借助eyeOffset属性设置z值为负（即z轴方向上离眼睛更近来解决,-100在地图放大到一定程度后就看不见了）
          width: 2.0,
          material: new Cesium.Color(0.4, 0.4, 0.4, 0.8),
        },
        billboard: {
          image: pinBuilder.fromColor(new Cesium.Color(0.2, 0.8, 0.2, 1.0), 150, Cesium.Color.WHITE),
          // image: require('../../../assets/image/bigScreen/changfangxing.png'),
          // color: new Cesium.Color(0.3, 0.7, 0, 1),
          color: new Cesium.Color(1.0, 1.0, 1.0, 1),
          verticalOrigin: Cesium.VerticalOrigin.MIDDLE,
          scale: that.scale,
          show: true,
          width: e.width,
          height: billHeight,
          // color: new Cesium.Color(1.0, 1.0, 1.0, 1),
          // eyeOffset: new Cesium.Cartesian3(0, 0, -10), //这里可以借助eyeOffset属性设置z值为负（即z轴方向上离眼睛更近来解决,-100在地图放大到一定程度后就看不见了）
          // color:new Cesium.Color(1.0, 1.0, 1.0, 0.4),
          // pixelOffset: new Cesium.Cartesian2(0, -billHeight*that.scale/2),
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
    // addPolygon() {
    //   let boundArr = [  2.0526407388732535, 0.7070363265326671,
    //         2.0526589917044067, 0.7070273822989919,
    //         2.0525332880274005, 0.7070302891824976,
    //         2.0524966113567302, 0.7070319734056404,
    //         2.052491448119782, 0.7069865321545481,
    //         2.052475312859978, 0.7069558317192143,
    //         2.052455082658649, 0.7069361121856691,
    //         2.0523918906533956, 0.7068898853593195,
    //         2.052253851853802, 0.7069415173217733,
    //         2.052233882537518, 0.7069706009830928,
    //         2.0522588948440887, 0.7070200964399544,
    //         2.0522855278266867, 0.7070895580256915,
    //         2.052336428634959, 0.7071958350712196,
    //        ]
    //     boundArr.forEach((item) =>{

    //     })    
    //   const entity = this._earth.czm.viewer.entities.add({
    //        name:   'Red line on terrain' ,
    //          polyline:  {
    //              positions:Cesium.Cartesian3.fromDegreesArray ( boundArr ),
    //              width: 2 ,
    //              material: new Cesium.Color(1.0, 1.0, 1.0, 1),
    //              clampToGround:   true
    //         }
    //   })
    // }
  }
};

export default EarthComp;
</script>
