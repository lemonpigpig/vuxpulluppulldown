export function RouterDefine(router) {
    router.map({ //定义路由映射
        '/page/suit-qa-list': {
            name: 'suit-qa-list',
            component: function(resolve) {
                require(['../page/suit-qa-list/Index.vue'], resolve)
            }
        },
        '/page/suit-qa-detail/:id/:showBtn': {
            name: 'suit-qa-detail',
            component: function(resolve) {
                require(['../page/suit-qa-detail/Index.vue'], resolve)
            }
        },
        // 我要回答
        '/answer-apply/:id/:source': {
            name: 'answer-apply',
            component: function(resolve) {
                require(['../page/answer-apply/Index.vue'], resolve)
            }
        },
        // 我要提问
        '/question-apply': {
            name: 'question-apply',
            component: function(resolve) {
                require(['../page/question-apply/Index.vue'], resolve)
            }
        },

        '/page/profile': {
            name: 'profile',
            component: function(resolve) {
                require(['../page/profile/Index.vue'], resolve)

            }
        },
        //我的问答
        '/page/my-qa/:id': {
            name: 'my-qa',
            component: function(resolve) {
                require(['../page/my-qa/Index.vue'], resolve)

            }
        }

    })

    router.redirect({ //定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
        '*': "/page/suit-qa-list" //重定向任意未匹配路径到/index
    });
    /**
     * fix ios title刷新不了的bug
     * @iframeLoad
     * @author hiluluke
     */
    const iframeLoad = function(src) {
        let iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = src
        document.body.appendChild(iframe)
        iframe.addEventListener('load', function() {
            setTimeout(function() {
                iframe.remove()
            }, 0)
        })
    }

    // document title change
    router.afterEach((transition) => {
        document.activeElement.blur();

        //document.title = transition.to.title || 'CNode.js'
            // if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            //     let src = '/static/fixrouter.html?' + Math.random()
            //     iframeLoad(src)
            // }
    })
}
