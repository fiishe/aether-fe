module UuidHelper
  def uuid_encode(uuid)
    # shorten uuid (primary key in db) for use in urls, etc
    [uuid.tr('-', '').scan(/../).map(&:hex).pack('c*')].pack('m*').tr('+/', '-_').slice(0..21)
  end

  def uuid_decode(short_id)
    # extract full uuid from shortened version
    (short_id.tr('-_', '+/') + '==').unpack('m0').first.unpack('H8H4H4H4H12').join('-')
  end
end
