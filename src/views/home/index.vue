<template>
    <div>
        <div class="operation">
            <van-button class="view-selected" type="info" size="small" @click="viewSelected">查看已选</van-button>
            <van-search class="search" v-model="data.searchValue" left-icon show-action placeholder="关键字搜索" @search="onSearch">
                <template #action>
                    <div @click="onSearch">
                        <van-icon name="search" />
                    </div>
                </template>
            </van-search>
        </div>
        <div class="theme">
            <vue-scroll :ops="data.ops" @handle-scroll="handleScroll" ref="vs">
                <div class="options">
                    <div class="home" ref="home">
                        <div class="model-selection" :class="{ active: active === 0 }">
                            <header class="align-center title">机器人选型</header>
                            <section class="container">
                                <ul class="flex-4">
                                    <li @click="selection"><span>施工管理</span></li>
                                    <li @click="selection"><span>施工平台</span></li>
                                    <li @click="selection"><span>加工平台</span></li>
                                    <li @click="selection"><span>混凝土工程</span></li>
                                    <li @click="selection"><span>主体结构休整</span></li>
                                    <li @click="selection"><span>砌筑工程</span></li>
                                    <li @click="selection"><span>材料加工运输</span></li>
                                    <li @click="selection"><span>施工辅助</span></li>
                                    <li @click="selection"><span>装饰工程</span></li>
                                    <li @click="selection"><span>装配式施工</span></li>
                                    <li @click="selection"><span>质量检测</span></li>
                                </ul>
                            </section>
                        </div>
                        <div class="classic-cases" :class="{ active: active === 1 }">
                            <header class="align-center title">金典案例</header>
                            <section class="container">
                                <van-swipe :loop="false" @change="onSwipeChange">
                                    <van-swipe-item class="swipe">
                                        <div class="li">
                                            <span>博智林公寓</span>
                                            <van-image class="img" :src="require('@/assets/images/classicCases/1.png')" alt="" />
                                        </div>
                                        <div class="li">
                                            <span>凤桐花园</span>
                                            <van-image class="img" :src="require('@/assets/images/classicCases/2.png')" alt="" />
                                        </div>
                                    </van-swipe-item>
                                    <van-swipe-item class="swipe">
                                        <div class="li">
                                            <span>vue</span>
                                            <van-image class="img" :src="require('@/assets/logo.png')" alt="" />
                                        </div>
                                    </van-swipe-item>
                                    <template #indicator>
                                        <div class="custom-indicator">{{ data.current + 1 }}/3</div>
                                    </template>
                                </van-swipe>
                            </section>
                        </div>
                        <div class="encyclopedia" :class="{ active: active === 2 }">
                            <header class="align-center title">机器人建筑小百科</header>
                            <section class="container">
                                <div class="sidebar">
                                    <van-search class="search" v-model="data.searchSidebarValue" left-icon placeholder="搜索关键词"></van-search>
                                    <van-sidebar v-model="data.activeKey" @change="onSidebarChange">
                                        <van-sidebar-item title="类型" />
                                        <van-sidebar-item title="案例" />
                                        <van-sidebar-item title="参数" />
                                        <van-sidebar-item title="专业" />
                                        <van-sidebar-item title="适用范围" />
                                        <van-sidebar-item title="配套条件" />
                                    </van-sidebar>
                                </div>
                                <ul class="content">
                                    <li>
                                        <a href="javascript: void(0);">使用自升造楼平台楼板承重做多大才够用？</a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);">室内砌块强是否有对应的机器人？</a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);">机器人运行是否对层高有要求？</a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);">别墅项目可以用哪些机器人？</a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);">夏热冬冷地区可以使用哪些机器人？</a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);">抗震等级高的地区是否可以使用机器人建筑体系？</a>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </vue-scroll>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueScroll from 'vuescroll'
@Component({
    components: {
        VueScroll,
    },
})
export default class Home extends Vue {
    private data = {
        ops: {
            vuescroll: {
                scroller: {
                    locking: true,
                    /** 最小缩放级别 */
                    minZoom: 1,
                    /** 最大缩放级别 */
                    maxZoom: 1,
                    preventDefault: true,
                    preventDefaultOnMove: true,
                },
            },
            bar: {
                background: '#b3b4b5',
                onlyShowBarOnScroll: false,
            },
            scrollPanel: {
                initialScrollY: 0,
                initialScrollX: 0,
                // 是否禁止x或y方向上的滚动
                scrollingY: true,
                scrollingX: false,
                easing: 'easeInQuad',
            },
            rail: {
                size: '1px',
            },
        },
        searchValue: '',
        searchSidebarValue: '',
        current: 0,
        activeKey: 0,
    }
    get active() {
        return this.changeActive()
    }
    // 监听滚动条
    handleScroll(vertical: any, horizontal: any, nativeEvent: any) {
        const home: any = this.$refs.home
        const modelSelectionTop = home.children[0].offsetTop // 机器人选型
        const classicCasesTop = home.children[1].offsetTop // 金典案例
        const encyclopedia = home.children[2].offsetTop // 机器人小百科
        const scrollTop = vertical.scrollTop
        const isChange = this.$store.getters['footer/getIsChange']
        if (isChange) {
            this.$store.commit('footer/SET_ISCHANGE', false)
        }
        if (scrollTop < classicCasesTop) {
            this.$store.commit('footer/SET_ACTIVE', 0)
        } else if (scrollTop < encyclopedia) {
            this.$store.commit('footer/SET_ACTIVE', 1)
        } else {
            this.$store.commit('footer/SET_ACTIVE', 2)
        }
    }
    // 滚动条定位
    changeActive() {
        const active = this.$store.getters['footer/getActive']
        const isChange = this.$store.getters['footer/getIsChange']
        if (isChange) {
            const home: any = this.$refs.home
            if (home && active < 3) {
                ;(this.$refs['vs'] as any).scrollTo(
                    {
                        y: home.children[active].offsetTop,
                    },
                    400,
                    'easeOutQuad'
                )
            }
        }
        return active
    }
    // 设置高度
    setHeight() {
        const home: any = this.$refs.home
        const modelSelection = home.children[0] // 机器人选型
        const encyclopedia = home.children[2] // 机器人小百科
        modelSelection.style.height = encyclopedia.style.height =
            home.clientHeight / 100 + 'rem'
    }
    // 搜索关键字
    onSearch(value: string) {
        console.log(value)
    }
    // 轮播切换
    onSwipeChange(index: number) {
        this.data.current = index
    }
    // 侧边导航切换
    onSidebarChange(index: number) {
        this.data.activeKey = index
    }
    // 跳转至二级菜单-室内施工机器人
    selection() {
        this.$store.commit('footer/SET_ACTIVE')
        this.$router.push('/selectionTypes')
    }
    // 查看已选
    viewSelected() {
        this.$router.push('/viewSelected')
    }
    mounted() {
        this.setHeight()
        this.changeActive()
    }
}
</script>

<style lang="stylus" scoped>
.theme {
    position: absolute;
    top: 0.54rem;
    left: 0;
    width: 100%;
    bottom: 0;
}

.home {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    .options {
        width: 0;
        display: inline-flex;
    }

    .title {
        font-size: 0.18rem;
        font-weight: bold;
        padding: 0.1rem;
    }

    .container {
        .flex-4 {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;

            li {
                position: relative;
                width: calc(25% - 0.22rem);
                padding: 0.05rem;
                text-align: center;
                margin: 0.05rem;
                border: 0.01rem solid #ebeef5;
                height: 0.4rem;

                span {
                    position: absolute;
                    width: 100%;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }

        .custom-indicator {
            position: absolute;
            right: 0.05rem;
            bottom: 0.05rem;
            padding: 0.02rem 0.05rem;
            font-size: 0.12rem;
            background: rgba(0, 0, 0, 0.1);
            color: #fff;
        }
    }

    .model-selection {
        border-top: 0.01rem solid #ebeef5;
    }

    .classic-cases {
        border-top: 0.01rem solid #ebeef5;

        .swipe {
            display: flex;

            .li {
                width: 50%;

                &:nth-child(odd) {
                    margin-right: 0.05rem;
                }

                &:nth-child(even) {
                    margin-left: 0.05rem;
                }

                span {
                    padding: 0.1rem 0;
                    text-align: center;
                    display: block;
                    background-color: #ebeef5;
                }

                .img {
                }
            }
        }
    }

    .encyclopedia {
        border-top: 0.01rem solid #ebeef5;

        .container {
            display: flex;

            .sidebar {
                width: 0.85rem;
            }

            .content {
                padding: 0.5rem 0.1rem 0.1rem;

                li {
                    padding-top: 0.2rem;

                    &:nth-child(1) {
                        padding-top: 0;
                    }

                    a {
                        &:active {
                            color: red;
                        }
                    }
                }
            }
        }
    }
}

.operation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.1rem;

    .view-selected {
        font-size: 0.12rem;
        border-top-left-radius: 0.2rem;
        border-top-right-radius: 0.2rem;
    }

    .search {
        width: 2rem;
    }
}
</style>
