$(function () {

  var $li = $('ul.tab-title li');
  $($li.eq(0).addClass('active').find('a').attr('href')).siblings('.tab-inner').hide();

  $li.click(function (e) {
    e.preventDefault();
    $($(this).find('a').attr('href')).show().siblings('.tab-inner').hide();
    $(this).addClass('active').siblings('.active').removeClass('active');
  });


  let countPrice = function () {
    let productMoney = $("#tab-demo .products .product input[type=radio]:checked").val();
    let total = Number(productMoney) || 0;
    $("#tab-demo .options .option input[type=checkbox]:checked").each(function () {
      let optMoney = (Number(this.value) || 0);
      total = total + optMoney;
    });
    $('.total-price').text(`${total}元`);

  };

  $("input").on("click", countPrice);

  let orderItemId = 0

  let showItem = function () {

    let product = $("#tab-demo .products .product input[type=radio]:checked").parent(".product:eq(0)").text()

    let options = $("#tab-demo .options .option input[type=checkbox]:checked").parent(".option").text()

    let productId = $("#tab-demo .products .product input[type=radio]:checked").parent(".product:eq(0)").data('product')

    let optionId = []
    countChecked = $("#tab-demo .options .option input[type=checkbox]:checked").length

    for (let i = 0; i < countChecked; i++) {
      optionId.push($("#tab-demo .options .option input[type=checkbox]:checked").parent(`.option:eq(${i})`).data('option')
      )
    }

    let total = $('.total-price').text()


    let tpl = `
      <div class="id-${orderItemId} media-body pb-3 lh-125 border-bottom border-gray order-item">
        <strong class="text-gray-dark">品名：${product}</strong>
        <span class="d-block">選項：${options}</span>
        <span class="d-block">價格：${total}</span>
        <input type="hidden" name="item[][product]" value="${productId}" />
        <input type="hidden" name="item[][options]" value="${optionId}" />
        <button class='delete mt-3 btn btn-danger btn-sm'>刪除囉</button>
      </div>
    `

    $("#order-item").append(tpl)
    orderItemId = orderItemId + 1

    $('input').prop('checked', false)

    $('.total-price').text(`${0}元`)

  }

  // $("#buy").click(showItem)
  // $("#buy").on('click', () => showItem)

  $("#buy").on('click', function (e) {
    e.preventDefault()
    showItem()
    alert("已加入購買清單");
  });


  $('#tab02 #order-item').on('click', '.delete', function (e) {
    e.preventDefault();
    var $this = $(this),
      $parent = $this.parents('.order-item:eq(0)');
    var ans = confirm('確定刪掉嗎');
    if (ans === true) $parent.remove();
  });
})
