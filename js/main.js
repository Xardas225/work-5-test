let page;
const pageConfig = 
{
    content: 
    {
        btn_create_store : '',
        store_list__elem : '#store__list__elem__pattern',
        store_list       : '.store__list__data',
    }
}
$(()=>
{
    page = new Page(pageConfig)
})


class Page 
{
    /** 
     * constructor
     */
    constructor(config)
    {
       this.config = config;

       this.content = new Content(config.content);
       
       this.init();
    }

    init()
    {
        this.requestData()
            .then((data)=>
            {
                this.setupPage(data);
            })
            .catch((error)=>
            {
                console.log(error);
            })
    }

    // simulated data request
    requestData()
    {
        let data = 
        {
            status: 200, 
            data:
            [
                {
                    id: 1,
                    name: 'Дипломная работа',
                    address: 'http://www.work5.ru/services'
                },
                {
                    id: 2,
                    name: 'Дипломная работа',
                    address: 'http://www.work5.ru/services'
                },
                {
                    id: 3,
                    name: 'Дипломная работа',
                    address: 'http://www.work5.ru/services'
                }
            ]
        };
        return new Promise((resolve, reject) =>
        {
            // ajax code should be here
            // $.post(
            //     {
            //       'url': "",
            //       'cache': false,
            //       'data': formData,
            //       'contentType': false,
            //       'processData': false,
            //       'success': data=>resolve(data),
            //       'error': error=>reject(error)
            //     },"json");
            resolve(data.data);
        })
    }

    setupPage(data)
    {
        this.content.setup(data);
    }
}

class Content 
{
    /** 
     * constructor
     */
    constructor(config)
    {
        this.config = config;

        $(this.config.btn_create_store).on('click', this.createStore.bind(this));
    }

    setup(data)
    {
        this.data = data;

        this.build();
    }

    build()
    {
        let content = '';
        this.data.map(elem=>
        {
            let $container = $(this.config.store_list__elem).clone();
            
            $container.find('.id').html(elem.id);
            $container.find('.name').html(elem.name);
            $container.find('.address').html(elem.address);
            $container.find('.btn__action-edit').attr('data-id', elem.id);
            $container.find('.btn__action-delete').attr('data-id', elem.id);

            content += $container.html()
        })
        $(this.config.store_list).html(content);

        this.initListeners();
    }

    initListeners()
    {
        $('.btn__action-edit').on('click', this.storeEdit.bind(this))
        $('.btn__action-delete').on('click', this.storeDelete.bind(this))
    }

    storeEdit(event)
    {

    }

    storeDelete()
    {

    }

    createStore()
    {
        
    }
}