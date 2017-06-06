window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
ga('create','UA-46471633-1','auto');ga('send','pageview');
(function(w, d) {
  if (d.querySelectorAll && d.addEventListener) {
    [].forEach.call(d.querySelectorAll('button.proof'), function(el) {
      var b = el.parentElement.nextElementSibling;
      b.style.display = 'none';
      el.addEventListener('click', function() {
        b.style.display = b.style.display === 'none' ? '' : 'none';
      }, false);
    });
  }
  if (d.getElementById('disqus_thread')) {
    var s = d.createElement('script');
    w.disqus_config = function() {
      var p = d.location.pathname;
      if (p.slice(-1) === '/') p += 'index.html';
      this.page.url = 'https://janmr.com' + p;
    };
    s.src = 'https://janmr-blog.disqus.com/embed.js';
    s.defer = true;
    s.setAttribute('data-timestamp', +new Date());
    d.body.appendChild(s);
  }
})(window, document);