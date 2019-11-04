function unimplemented(callback) {
  const err = new Error('not implemented')
  err.code = 'ENOSYS'
  callback(err)
}
function unimplemented1(_1, callback) {
  unimplemented(callback)
}
function unimplemented2(_1, _2, callback) {
  unimplemented(callback)
}
function bootstrapGo() {
  const go = new Go();
  fetch('main.css')
    .then(progressHandler)
    .then(r => r.arrayBuffer())
    .then(buffer => WebAssembly.instantiate(buffer, go.importObject))
    .then(result => {
      fs.stat = unimplemented1;
      fs.lstat = unimplemented1;
      fs.unlink = unimplemented1;
      fs.rmdir = unimplemented1;
      fs.mkdir = unimplemented2;
      go.run(result.instance);
      document.getElementById('loading').style.display = 'none';
      bootstrapTerm();
    });
}
function bootstrapTerm() {
  window.term = $('<div class="term">')
  $('.x-term-ctx').append(term)
  window.shell = term.console({
    promptLabel: 'TiDB> ',
    continuedPromptLabel: ' -> ',
    commandValidate: function(line) {
      if (line == '') {
        return false;
      } else {
        return true;
      }
    },
    commandHandle: function(line, report) {
      if (line.trim().endsWith(';')) {
        window.shell.continuedPrompt = false
        executeSQL(line, function(msg) {
          report([
            {
              msg,
              className: 'jquery-console-message-success'
            }
          ])
        })
      } else {
        window.shell.continuedPrompt = true
      }
    },
    promptHistory: true
  })
  window.upload = function(onsuccess, onerror) {
    const uploader = document.getElementById('file-uploader')
    uploader.addEventListener('change', function() {
      const reader = new FileReader()
      reader.addEventListener('load', function(e) {
        onsuccess(e.target.result)
      })
      reader.addEventListener('error', function() {
        onerror('failed to read file')
      })
      if (this.files.length == 0) {
        onerror('no file selected')
      } else {
        reader.readAsText(this.files[0])
      }
    })
    uploader.click()
  }
}
bootstrapGo()
function progress({ loaded, total }) {
  const num = Math.round((loaded / total) * 100) + '%'
  $('.loading-before').css({
    width: num
  })
  if (num == '100%') {
    $('.loading').html('<div class="loading-before">Running</div>Running')
    $('.loading-before').addClass('animated')
  }
}
function progressHandler(response) {
  if (!response.ok) {
    throw Error(response.status + ' ' + response.statusText)
  }
  if (!response.body) {
    throw Error('ReadableStream not yet supported in this browser.')
  }
  const total = 76 * 1024 * 1024 // hardcode since some CDN does NOT return content-length for compressed content
  let loaded = 0
  return new Response(
    new ReadableStream({
      start(controller) {
        const reader = response.body.getReader()
        read()
        function read() {
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                controller.close()
                return
              }
              loaded += value.byteLength
              progress({
                loaded,
                total
              })
              controller.enqueue(value)
              read()
            })
            .catch(error => {
              console.error(error)
              controller.error(error)
            })
        }
      }
    })
  )
}
