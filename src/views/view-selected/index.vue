<template>
    <div class="router view-selected">
        <van-nav-bar title="已选款式" left-arrow @click-left="onClickLeft" />
        <section class="main">
            <van-checkbox-group class="container cell-2" v-model="data.result" ref="checkboxGroup">
                <van-cell-group>
                    <van-cell v-for="(item, index) in data.list" clickable :key="item.id" title="" @click="cellClick(item)">
                        <template #right-icon>
                            <div class="li">
                                <van-image class="img" @click.stop="imageClick(item)" :src="require(`@/assets/images/modelSelection/${index + 1}.png`)" alt="" />
                                <van-checkbox class="checkbox" :name="item.id"><span>{{item.label}}</span></van-checkbox>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
            <div class="check-all">
                <van-checkbox class="checkbox" v-model="data.checkedAll" @click="checkAll">全选</van-checkbox>
            </div>
            <div class="statistics">
                <span>共计：{{data.checkeds.length}}款</span>
                <van-button type="primary" size="small">生成报告</van-button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Footer from '@/layouts/Footer.vue'
@Component({
    components: {
        Footer,
    },
})
export default class ViewSelected extends Vue {
    private data: any = {
        active: '',
        searchValue: '',
        checkedAll: true,
        checkeds: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'],
        list: [
            { id: 'a1', label: '大臂展建筑机器人通用载具平台' },
            { id: 'a2', label: '内墙板安装机器人' },
            { id: 'a3', label: '混凝土内墙面打磨机器人' },
            { id: 'a4', label: '混凝土内墙面天花打磨机器人' },
            { id: 'a5', label: '楼层清洁机器人' },
            { id: 'a6', label: '螺杆洞封堵机器人' },
        ],
        result: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'],
    }
    onClickLeft() {
        this.$router.go(-1)
        this.$store.commit('footer/SET_ACTIVE', 0)
    }
    toPage() {
        this.$router.push('/typesDetail')
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
    // 全选
    checkAll() {
        this.data.checkeds = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6']
        this.data.checkedAll = true
        ;(this.$refs.checkboxGroup as any).toggleAll(true)
    }
    // 点击图片
    imageClick(item: any) {
        this.$router.push('/typesDetail')
    }
}
</script>

<style lang="stylus" scoped>
.view-selected {
    .main {
        height: calc(100% - 0.46rem);
        overflow: auto;
    }

    .check-all {
        padding: 0.1rem;
    }

    .statistics {
        text-align: right;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        border-top: 0.01rem solid #ebeef5;

        .van-button {
            margin-right: 0.1rem;
            margin-left: 0.1rem;
        }
    }
}
</style>
<style lang="stylus">
.van-cell-group {
    .li {
        .van-checkbox__label {
            line-height: 0.15rem;
        }
    }
}
</style>