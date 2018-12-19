export function StatusSwitch(self, ref_crud, m, id_key, field_key) {
    var f = function(createElement, scope) {
        let record = scope.row
        return createElement('div', {}, [
            createElement('el-switch', {
                props: {
                    'active-value': 1,
                    'inactive-value': 0,
                    value: record.status
                },
                domProps: {
                    number: true
                },
                on: {
                    change(a, b, c) {
                        var api = self.$refs[ref_crud].GetCurrentReport().crud
                        var o = {}
                        id_key = id_key || '_id'
                        o[id_key] = record[id_key]
                        field_key = field_key || 'status'
                        o[field_key] = 1 - record[field_key]
                        var p = null
                        if (m) {
                            p = api.post(m, o)
                        } else {
                            p = api.update(o)
                        }
                        p.done(() => {
                            record.status = 1 - record.status
                        })
                    },
                    input() {}
                }
            })
        ])
    }
    return f
}
