module CrystalHelper
  EPOCH = Time.at(ENV['EPOCH'].to_i)
  BIT_SHIFT = 12
  INCREMENT_PERIOD = 1 << BIT_SHIFT # = 2^12 = 4096

  def generate_crystal(increment)
    # get current time (ms)
    time = get_time_ms()

    # shift it to make space for increment
    time = time << BIT_SHIFT

    # add increment to prevent collision of ids made in the same millisecond
    return time + (increment % INCREMENT_PERIOD)

    # the result is a sortable "crystal ID" that can be publicly exposed
    # without revealing information about the app's volume of usage!
    #
    # crystal = (ms since EPOCH << 12) + (increment % 4096)
  end

  def extract_time(crystal)
    # return approximate time crystal was generated (to seconds)
    crystal_seconds = (crystal >> BIT_SHIFT) / 1000
    return EPOCH + crystal_seconds
  end

  private

  def get_time_ms #in ms since EPOCH
    time_seconds = Time.now - EPOCH
    return (time_seconds * 1000.0).to_i
  end
end
