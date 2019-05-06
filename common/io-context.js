import regeneratorRuntime from '../libs/runtime'
import config from '../config/config'
const {
  prefix,
  mode,
  https
} = config

const ioContext = async ({
  url,
  header = {},
  method = 'GET',
  dataType = 'json',
  data = {},
  originRes = false,
}) => {

  // restful 接口  参数 ':xxx' 的形式传入data
  let restful 

	const dataKeys = Object.keys(data)
	const restParam = []

	if (dataKeys.length > 0) {
		if (dataKeys.some(v => v.indexOf(':') > -1)) {
			restful = true
			dataKeys.map((v, i) => {
				if (v.indexOf(':') > -1) {
					restParam.push(data[v])
					delete data[v]
				}
			})
		}
	}

  // 所有的请求，header默认携带token
  const res = await new Promise((resolve, reject) => {
    wx.request({
      url: `${https ? 'https' : 'http'}://${prefix[mode]}/${url}${restful ? '/' + restParam.join('/') : ''}`,
      header: {
        "Content-Type": "application/json",
        token: wx.getStorageSync('token') || '',
        ...header,
      },
      method,
      data,
      dataType,
      success: (res) => {
        resolve(res.data)
        
        // 在这里进行统一的 返回处理
        // if (res.data.success) {
				// 	if (originRes) {
				// 		resolve(res)
				// 	} else {
				// 		resolve(res.data.content)
				// 	}
				// } else {
				// 	reject(res.data.message)
				// }
      },
      fail: (err) => {
        reject(err)
      },
      complete: (e) => {

      }
    })
  })
  return res
}

export {
  ioContext
}