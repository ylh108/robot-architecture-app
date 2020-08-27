<template>
    <div class="router selection-types">
        <van-nav-bar title="室内施工机器人" left-arrow @click-left="onClickLeft" />
        <van-search class="search" v-model="data.searchValue" left-icon show-action placeholder="关键字搜索" @search="onSearch">
            <template #action>
                <div @click="onSearch">
                    <van-icon name="search" />
                </div>
            </template>
        </van-search>
        <van-checkbox-group class="container cell-2" v-model="data.result" ref="checkboxGroup">
            <van-cell-group>
                <van-cell v-for="(item, index) in data.list" clickable :key="item.id" title="" @click="cellClick(item)">
                    <template #right-icon>
                        <div class="li">
                            <van-image @click.stop="imageClick(item)" class="img" :src="require(`@/assets/images/modelSelection/${index + 1}.png`)" alt="" />
                            <van-checkbox class="checkbox" :name="item.id" @click="addShoppingCart($event,item.id)"><span>{{item.label}}</span></van-checkbox>
                        </div>
                    </template>
                </van-cell>
            </van-cell-group>
        </van-checkbox-group>
        <section class="add-shopping-cart">
            <van-button type="primary" size="small">
                ⭐添加至已选
                <span class="count" v-show="data.checkdsCount">{{ data.checkdsCount }}</span>
                <div class="ball-wrapper" v-for="(ball, index) of data.balls" :key="index">
                    <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                        <div class="ball" v-show="ball.show">
                            <!--这里为了做两个维度的动画，因此需要多包一层，外层做Y轴，内层做X轴动画-->
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </van-button>
        </section>
        <footer class="footer">
            <Footer />
        </footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Footer from '@/layouts/Footer.vue'
@Component({
    components: {
        Footer,
    },
})
export default class modelselectionTypes extends Vue {
    private data: any = {
        active: '',
        searchValue: '',
        checkedAll: true,
        checkeds: [],
        checkdsCount: 0,
        list: [
            { id: 'a1', label: '大臂展建筑机器人通用载具平台' },
            { id: 'a2', label: '内墙板安装机器人' },
            { id: 'a3', label: '混凝土内墙面打磨机器人' },
            { id: 'a4', label: '混凝土内墙面天花打磨机器人' },
            { id: 'a5', label: '楼层清洁机器人' },
            { id: 'a6', label: '螺杆洞封堵机器人' },
        ],
        result: [],
        balls: [
            // 这里定义了多个ball,是因为可能同时有多个小球在动画中（快速点击多次或者多个商品）
            {
                show: false,
            },
            {
                show: false,
            },
            {
                show: false,
            },
            {
                show: false,
            },
            {
                show: false,
            },
        ],
        dropBalls: [], // 在动画中的小球集合
    }

    @Watch('data.checkeds')
    private getCheckeds(val: any, oldVal: any) {
        if (val.length > oldVal.length) {
            setTimeout(() => {
                this.data.checkdsCount = val.length
            }, 800)
        } else {
            this.data.checkdsCount = val.length
        }
    }

    addShoppingCart(e: any, id: string) {
        if (!this.data.checkeds.includes(id)) {
            // 取消选中不执行动画
            return
        }
        let el: any = e.target
        this.data.balls.forEach((v: any) => {
            if (!v.show) {
                v.show = true // 当切换元素的display:block/none时，会触发vue的动画
                v.el = el // 将触发点击事件的“+”号保定道小球对象上，方便获取动画初始时的位置
                this.data.dropBalls.push(v) // 取一个小球加入动画队列
                return
            }
        })
    }
    beforeEnter(el: any) {
        let count = this.data.balls.length
        while (count--) {
            // 将动画队列中的小球，依次处理
            let ball: any = this.data.balls[count]
            if (ball.show) {
                let rect = ball.el.offsetParent.children[1].children[1].getBoundingClientRect() //拿到点击的“+”号的位置
                let x = rect.left  - window.innerWidth / 2 - 75 // 需要偏移的x向距离
                let y = rect.top - (window.innerHeight - 75) // 需要偏移的y向距离
                el.style.display = '' // 当前状态下，display值为none，将其置空。

                // 这里需要注意了，小球飞入的动画分两个维度，X轴和Y轴，因此
                el.style.webkitTransform = `translate3d(0px, ${y}px, 0px)` // 首先将“ball”Y向移动至“+”好位置
                el.style.transform = `translate3d(0px, ${y}px, 0px)`
                // 接着将“inner-hook”X向移动至“+”号处，其实此时外层“ball”的X位置没有动，但因为背景色等等样式只应用于“inner-hook”上，因此，视觉效果上，这个小球是移动到了“+”号的位置
                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
                inner.style.transform = `translate3d(${x}px, 0, 0)`
            }
        }
    }
    enter(el: any) {
        let rf = el.offsetHeight // 主动触发浏览器重绘
        this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0, 0, 0)' //接着将小球位置置为初始值，但css中设置了transition .8s,因此，动画效果就出来了
            el.style.transform = 'translate3d(0, 0, 0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = 'translate3d(0, 0, 0)'
            el.style.transform = 'translate3d(0, 0, 0)'
        })
    }
    afterEnter(el: any) {
        let ball = this.data.dropBalls.shift() //结束后，将这个活动中的小球删除
        if (ball) {
            ball.show = false
            el.style.display = 'none' // 并且将其设为不可见
        }
    }
    onClickLeft() {
        this.$router.go(-1)
        this.$store.commit('footer/SET_ACTIVE', 0)
    }
    // 搜索关键字
    onSearch(value: string) {
        console.log(value)
    }
    // 点击复选框
    cellClick(item: any) {
        this.data.checkeds = JSON.parse(JSON.stringify(this.data.result))
        const idx = this.data.checkeds.indexOf(item.id)
        if (idx >= 0) {
            this.data.checkeds.splice(idx, 1)
        } else {
            this.data.checkeds.push(item.id)
        }
        if (this.data.checkeds.length === 6) {
            this.data.checkedAll = true
        } else {
            this.data.checkedAll = false
        }
    }
    // 点击图片
    imageClick(item: any) {
        this.$router.push('/typesDetail')
    }
}
</script>

<style lang="stylus" scoped>
.selection-types {
    .search {
        padding: 0.1rem;
    }

    .container {
        height: calc(100% - 0.46rem - 0.54rem - 0.5rem - 0.3rem);
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        overflow: auto;

        li {
            width: calc(50% - 0.12rem);
            margin: 0.05rem;
            border: 0.01rem solid #ebeef5;
            text-align: center;

            .img {
                height: 1.4rem;
                overflow: hidden;
            }

            .checkbox {
                height: 0.4rem;
                padding: 0 0.1rem;

                span {
                    line-height: 0.15rem;
                }
            }
        }
    }

    .add-shopping-cart {
        text-align: right;

        .count {
            position: absolute;
            top: -0.08rem;
            left: -0.08rem;
            background-color: #1989fa;
            color: #fff;
            border-radius: 50%;
            padding: 0.02rem 0.05rem;
        }

        .ball {
            position: absolute;
            top: -0.08rem;
            left: -0.08rem;
            border-radius: 50%;
            padding: 0.02rem 0.05rem;

            &.drop-enter-active {
                transition: all 0.8s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            }

            .inner {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #1989fa;
                transition: all 0.8s;
            }
        }
    }
}
</style>
