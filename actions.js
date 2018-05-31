//Event Handler to show expanded channel info when pressing plus sign
$('.expandIcon').on('click', function(){
  let $sibling = $(this).siblings('p, h5')
  $sibling.toggle()
  if ($(this).text() === '+'){
    $(this).text('-')
  } else {
    $(this).text('+')
  }
})

//Event handlers to filter channels based off current activity
$('#allBtn').on('click', function(){
  $('.channel').show()
})

$('#onlineBtn').on('click', function(){
  $('.online').show()
  $('.offline').hide()
})

$('#offlineBtn').on('click', function(){
  $('.offline').show()
  $('.online').hide()
})

//Loop to get streaming data from twitch API
for (let i = 0; i < 9; i++){
   $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + $('h4:eq(' + i + ')').text() + '?callback=?', function(data){
      if (!data.stream){
        $('h4:eq(' + i + ')').parent().removeClass('online')
.addClass('offline')
        $('h4:eq(' + i + ')').siblings('.streamStatus').text('Offline')
      } else {
        $('h4:eq(' + i + ')').parent().removeClass('offline')
.addClass('online')
        $('h4:eq(' + i + ')').siblings('.streamStatus').text(data.stream.game)
      }
   })
 }

//Loop to add logo/followers/views info from twitch api
let newContent = ''
for (let i = 0; i < 9; i++){
   $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + $('h4:eq(' + i + ')').text() + '?callback=?', function(data){
     $('h4:eq(' + i + ')').siblings('h5:eq(0)').append(' ' + data.followers)
     $('h4:eq(' + i + ')').siblings('h5:eq(1)').append(' ' + data.views)
     newContent = "<img class='channelIcon' "
     newContent += 'src = ' + data.logo + " alt = 'Channel Icon'"
     newContent += ' />'
     $('h4:eq(' + i + ')').before(newContent)
   })
 }
