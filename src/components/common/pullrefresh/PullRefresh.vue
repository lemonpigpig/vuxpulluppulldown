<template>
    <div>
        <slot name="tab"></slot>
        <scroller lock-x scrollbar-y use-pullup use-pulldown height="" @pullup:loading="loadMore" @pulldown:loading="refresh" :pullup-status.sync="pullupStatus"
                  :pulldown-config='pullDownConfig' v-ref:scroller 　>
              <div class="box2">
                 <slot name="lists"></slot>
                <div :style="{height:btmEmptyHeight}"></div>
              </div>
              <!--pullup slot-->
              <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; text-align: center;" :style="pullupPos" >
                <span v-show="pullupStatus === 'default'"></span>
                <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
                <!--<span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>-->
                  <span v-show="pullupStatus === 'loading'">数据加载中...</span>
              </div>
        </scroller>
    </div>
</template>
<script>
import { Scroller, Divider, Group, Spinner } from 'vux'
export default {
    name: 'youfanpullrefresh',
    props: {
        urlParam:{
            type: Object,
            default: {}
        },
        pullupLoadingPos:{
            type:Object,
            default:function(){
                return{
                    height:'40px',
                    bottom:'-40px'
                }
            }
        },
        bottomEmptyHeight:{
            type:String,
            default:0
        }
    },
    components: {
        Scroller,
        Divider,
        Group,
        Spinner
    },
    ready: function() {
        this.resetScroller();
    },
    data: function() {
        return {
            countObj:{up: 0,down: 0},
            type:2,
            pageIndex:0,
            pageNum: 20,
            originalCount: 0,
            pullupStatus: 'default',
            pullupPos:this.pullupLoadingPos,
            btmEmptyHeight:this.bottomEmptyHeight,
            pullDownConfig:{content:'下拉刷新',downContent:'下拉刷新',upContent:'下拉刷新',loadingContent:'加载中...'}

        }
    },
    methods: {
        loadMore (uuid) {
            setTimeout(() => {
                ++this.pageIndex
                this.getData({page: this.pageIndex},GlobalModel.PULL_UP)
            }, 1000)
        },
        refresh (uuid) {
            setTimeout(() => {
                this.getData({page: 1},GlobalModel.PULL_DOWN)
            }, 2000)
        },
        getData (obj, type) {
            //type 1 下拉刷新 down ;2 上拉加载更多 up
            this.type = type;
            var qaList = [];
            var isReset = false;
            if(this.urlParam === {}){
                alert('请传入url参数!')
            }
            var params = Object.assign({pageSize: this.pageNum,pageIndex: obj.page},this.urlParam)
            this.$http.get(GlobalModel.SERVER_URL, {
                params
            }).then((response) => {
                var temp = [];
                if(this.pageNum > 10){
                    this.pageIndex = this.originalCount;
                    this.pageNum = 10;
                }
                if (response.data.status == 1) {
                    if(type == 2){
                        this.countObj.up = this.countObj.up + 1;
                        //console.log(this.countObj.up)
                    }else if(type == 1){
                         //console.log(this.countObj.down)
                        this.countObj.down = this.countObj.down + 1;
                    }
                   
                    let data = response.body.data.list;
                    if (data.length == 0) {
                        this.$broadcast('pullup:disable', this.$refs.scroller.uuid)

                        if(this.pageIndex > 0){
                            //回滚到原始位置
                            this.$refs.scroller.pullup.xscroll.scrollTo(0,this.$refs.scroller.pullup.xscroll.getScrollTop()-this.$refs.scroller.pullup.userConfig.height);
                        }else{
                            this.$refs.scroller.pullup.xscroll.scrollTo(0,0);
                        }

                        return;
                    }
                    if(response.body.data.total<this.pageNum+1){
            
                        if(type == 2 && this.countObj.up>1){
                            isReset = true 
                        }
                        else if(type == 1 && this.countObj.down>0){
                            isReset = true 
                            //console.log('down:',this.countObj.down)
                        }
                       // console.log('ddd')
                        this.$nextTick(function(){
                            this.$broadcast('pullup:reset', this.$refs.scroller.uuid)
                        })
                    }
                     for (let i in data) {
                    
                        if (type == 2) {
                       
                        qaList.push(data[i]);

                        } else {
                            
                            temp.push(data[i]);
                        }
                        
                    }
                    if (type == 1) {
                        //下拉刷新
                        qaList = temp;
                    }
                    var resultObj = {
                        type: this.type,
                        qaList: qaList,
                        isStop:isReset
                    };
                    this.$dispatch("updateList",resultObj);
                    this.$nextTick(() => {
                        if(type === 2)
                        {
                            this.$broadcast('pullup:reset', this.$refs.scroller.uuid)
                        }else
                        {
                            this.$broadcast('pulldown:reset', this.$refs.scroller.uuid)
                        }

                    });

                }

            })
        },
        resetScroller (){
            this.$refs.scroller.pullup.xscroll.scrollTo(0,this.$refs.scroller.pullup.userConfig.height);
            this.$refs.scroller.pullup.xscroll.scrollTo(0,0);

        },
        updateData (p_params){
            this.$refs.scroller.pullup.xscroll.scrollTo(0,0);
            this.$broadcast('pullup:enable', this.$refs.scroller.uuid)
            this.countObj.up = 0;
            this.countObj.down = 0
            this.urlParam = p_params;
            this.getData({page: 1},GlobalModel.PULL_UP);
            this.$nextTick(function(){
                this.$broadcast('pullup:reset', this.$refs.scroller.uuid)
                this.$broadcast('pulldown:reset', this.$refs.scroller.uuid)
            })
        }

    }
}
</script>
<style lang="less" scoped>
.empty {
    height: 45px;
    width: 100%;
}
.box2-wrap {
  height: auto;
  overflow: hidden;
}
.rotate {
  display: inline-block;
  transform: rotate(-180deg);
}
.pullup-arrow {
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}


</style>
